
import { useMemo, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../services/tasksApi";
import type { Task, TaskStatus } from "../types/task";
import Spinner from "../components/Spinner";
import NewTaskModal from "../components/NewTaskModal";
import Column from "../components/Column";
import { useMeQuery } from "../services/authApi";
import OrganizationBadge from "../components/organization/OrganizationBadge";
import SelectOrganization from "../components/organization/SelectOrganization";
import Button from "../components/button/Button";

const ORG_KEY = "active_org_id";

const getStoredOrganizationId = () => localStorage.getItem(ORG_KEY) ?? "";

const ProjectBoard = () => {
  const navigate  = useNavigate()
  const { projectId = "" } = useParams<{ projectId: string }>();
  const { data: me, isLoading: loadingMe } = useMeQuery();
  const [orgId, setOrgId] = useState<string>(() => getStoredOrganizationId());
  const hasNoOrganizations = !!me && (me.members?.length ?? 0) === 0;
  const needSelectOrg = !orgId && !!me && (me.members?.length ?? 0) > 0;
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useGetTasksQuery(
    { projectId, orgId },
    { skip: !projectId || !orgId }
  );

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [openNew, setOpenNew] = useState(false);

  const columns = useMemo(() => {
    const sortByOrder = (a: Task, b: Task) => (a.order ?? 0) - (b.order ?? 0);
    return {
      todo: tasks.filter((t) => t.status === "todo").sort(sortByOrder),
      inprogress: tasks.filter((t) => t.status === "inprogress").sort(sortByOrder),
      done: tasks.filter((t) => t.status === "done").sort(sortByOrder),
    };
  }, [tasks]);

  if (loadingMe) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (!me) return null;

  if (hasNoOrganizations) {
     navigate("/no-organization");
  }

   const onChoose: React.FormEventHandler<HTMLFormElement> = (e) => {
     e.preventDefault();
     const fd = new FormData(e.currentTarget);
     const chosen = String(fd.get("orgId") || "");
     if (chosen) {
       localStorage.setItem(ORG_KEY, chosen);
       setOrgId(chosen);
     }
   };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div dir="rtl" className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">שגיאה בטעינת משימות</h2>
        <p className="text-red-600">בדוק/י הרשאות ושהארגון הנבחר תקין.</p>
      </div>
    );
  }

  const nextOrder = (list: Task[]) => {
    if (!list.length) return 1000;
    return Math.max(...list.map((t) => t.order ?? 0)) + 1000;
  };

  const handleCreate = async (values: {
    title: string;
    description?: string;
    status: TaskStatus;
    assigneeName?: string;
    priority?: "low" | "medium" | "high";
    labels?: string[];
  }) => {
    try {
      const res =  await createTask({
        projectId,
        orgId: orgId,
        body: { ...values, order: nextOrder(columns[values.status]) }}).unwrap();
      setOpenNew(false);
      await refetch();
    } catch {
      alert("יצירת משימה נכשלה");
    }
  };

  const patchTask = async (taskId: string, patch: Partial<Task>) => {
    try {
      await updateTask({ projectId, taskId, patch }).unwrap();
    } catch {
      alert("עדכון משימה נכשל");
    }
  };

  const removeTask = async (taskId: string) => {
    if (!confirm("למחוק את המשימה?")) return;
    try {
      await deleteTask({ projectId, taskId }).unwrap();
    } catch {
      alert("מחיקה נכשלה");
    }
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">לוח פרויקט</h1>
          <p className="text-gray-600 text-sm">
            משימות לפי סטטוס, נתונים מהשרת
          </p>
        </div>
        <div className="flex items-center gap-3">
          <OrganizationBadge orgId={orgId} user={me} />
          <Button text="משימה חדשה +" type="submit" className="px-4 py-2" isLoading={isLoading} onClick={() => setOpenNew(true)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Column
          title="To-Do"
          count={columns.todo.length}
          tasks={columns.todo}
          onPatch={patchTask}
          onDelete={removeTask}
        />
        <Column
          title="בתהליך"
          count={columns.inprogress.length}
          tasks={columns.inprogress}
          onPatch={patchTask}
          onDelete={removeTask}
        />
        <Column
          title="הושלם"
          count={columns.done.length}
          tasks={columns.done}
          onPatch={patchTask}
          onDelete={removeTask}
        />
      </div>

      <NewTaskModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}


export default ProjectBoard;