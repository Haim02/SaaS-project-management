import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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

const ProjectBoard = () => {
  const { projectId = "" } = useParams();
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useGetTasksQuery({ projectId });
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [openNew, setOpenNew] = useState(false);

  const columns = useMemo(() => {
    const sortByOrder = (a: Task, b: Task) => (a.order ?? 0) - (b.order ?? 0);
    return {
      todo: tasks.filter((t) => t.status === "todo").sort(sortByOrder),
      inprogress: tasks
        .filter((t) => t.status === "inprogress")
        .sort(sortByOrder),
      done: tasks.filter((t) => t.status === "done").sort(sortByOrder),
    };
  }, [tasks]);

  if (isLoading) return <Spinner />;
  if (isError)
    return <div className="p-6 text-red-600">שגיאה בטעינת משימות</div>;

  const handleCreate = async (values: {
    title: string;
    description?: string;
    status: TaskStatus;
    assigneeName?: string;
    priority?: "low" | "medium" | "high";
    labels?: string[];
  }) => {
    try {
      await createTask({
        projectId,
        body: { ...values, order: nextOrder(columns[values.status]) },
      }).unwrap();
      setOpenNew(false);
    } catch {
      alert("יצירת משימה נכשלה");
    }
  };

  const nextOrder = (list: Task[]) => {
    if (!list.length) return 1000;
    return Math.max(...list.map((t) => t.order ?? 0)) + 1000;
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
          <button
            onClick={() => refetch()}
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            רענן
          </button>
          <button
            onClick={() => setOpenNew(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            + משימה חדשה
          </button>
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
};

export default ProjectBoard;
