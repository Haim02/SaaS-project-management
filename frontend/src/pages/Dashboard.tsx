import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../services/projectApi";
import { useGetTasksQuery } from "../services/tasksApi";
import Spinner from "../components/Spinner";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  BoltIcon,
  PlusCircleIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "../components/dashboard/ProjectCard";
import EmptyState from "../components/dashboard/EmptyState";
import StatCard from "../components/dashboard/StatCard";
import CardAction from "../components/dashboard/CardAction";
import { useMeQuery } from "../services/authApi";
import useActiveOrg from "../hooks/useActiveOrg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: me } = useMeQuery();
  const { activeOrgId } = useActiveOrg(me);

  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isError: isProjectsError,
  } = useGetProjectsQuery({ orgId: activeOrgId! });

  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    projects?.[0]?._id ?? null
  );

  const { data: activeTasks = [], isLoading: isLoadingTasks } =
    useGetTasksQuery(
      activeProjectId ? { projectId: activeProjectId } : ({} as any),
      { skip: !activeProjectId }
    );

  const stats = useMemo(() => {
    const total = activeTasks.length;
    const todo = activeTasks.filter((t) => t.status === "todo").length;
    const inprogress = activeTasks.filter(
      (t) => t.status === "inprogress"
    ).length;
    const done = activeTasks.filter((t) => t.status === "done").length;
    return { total, todo, inprogress, done };
  }, [activeTasks]);

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort(
        (a: any, b: any) =>
          new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
          new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
      )
      .slice(0, 6);
  }, [projects]);

  if (isLoadingProjects) return <Spinner />;
  if (isProjectsError)
    return <div className="p-6 text-red-600">שגיאה בטעינת פרויקטים</div>;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">ברוך הבא ללוח הניהול</h1>
          <p className="text-gray-600 text-sm">
            סקירה כללית על הפרויקטים והמשימות שלך
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="px-3 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2"
            title="ניהול פרויקטים"
          >
            <FolderIcon className="h-5 w-5" />
            כל הפרויקטים
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <PlusCircleIcon className="h-5 w-5" />
            פרויקט חדש
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardAction
          title="צור משימה חדשה"
          subtitle="מהר ותכל׳ס — ישירות ללוח"
          icon={BoltIcon}
          onClick={() =>
            navigate(
              activeProjectId ? `/projects/${activeProjectId}` : "/projects"
            )
          }
        />
        <CardAction
          title="פתח פרויקט אחרון"
          subtitle={recentProjects[0]?.name ?? "אין נתונים"}
          icon={ClipboardDocumentListIcon}
          onClick={() =>
            recentProjects[0]?._id &&
            navigate(`/projects/${recentProjects[0]._id}`)
          }
          disabled={!recentProjects[0]}
        />
        <CardAction
          title="נהל פרויקטים"
          subtitle="צפייה, יצירה ומחיקה"
          icon={FolderIcon}
          onClick={() => navigate("/projects")}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">סיכום משימות</h2>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={activeProjectId ?? ""}
            onChange={(e) => setActiveProjectId(e.target.value || null)}
          >
            <option value="">
              {projects.length ? "בחר פרויקט להצגת סטטוס" : "אין פרויקטים"}
            </option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="כל המשימות"
            value={stats.total}
            icon={ChartBarIcon}
            loading={isLoadingTasks && !!activeProjectId}
          />
          <StatCard
            title="To-Do"
            value={stats.todo}
            icon={ClipboardDocumentListIcon}
            loading={isLoadingTasks && !!activeProjectId}
          />
          <StatCard
            title="בתהליך"
            value={stats.inprogress}
            icon={BoltIcon}
            loading={isLoadingTasks && !!activeProjectId}
          />
          <StatCard
            title="הושלם"
            value={stats.done}
            icon={CheckCircleIcon}
            loading={isLoadingTasks && !!activeProjectId}
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">פרויקטים אחרונים</h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-sm text-blue-700 hover:underline"
          >
            כל הפרויקטים →
          </button>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="אין לך עדיין פרויקטים"
            desc="צור את הפרויקט הראשון שלך והתחל לעבוד"
            actionText="צור פרויקט"
            onAction={() => navigate("/projects")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map((p) => (
              <ProjectCard
                key={p._id}
                project={p}
                onOpen={() => navigate(`/projects/${p._id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
