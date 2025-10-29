import { useState } from "react";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
} from "../services/projectApi";
import Spinner from "../components/Spinner";
import NewProjectModal from "../components/NewProjectModal";
import ProjectCard from "../components/ProjectCard";
import RequirePermission from "../components/Require/RequirePermission";
import OrgSelector from "../components/OrgSelector";
import { useMeQuery } from "../services/authApi";
import useActiveOrg from "../hooks/useActiveOrg";

type HandleCreateProps = {
  name: string;
  description?: string;
};

const ORG_KEY = "active_org_id";

const getStoredOrganizationId = () => localStorage.getItem(ORG_KEY) ?? "";

const ProjectsDashboard = () => {
  const { data: me } = useMeQuery();
  const [_orgId, _setOrgId] = useState<string>(() => getStoredOrganizationId());
  const { activeOrgId } = useActiveOrg(me);
  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useGetProjectsQuery({ orgId: activeOrgId! });
  const [createProject] = useCreateProjectMutation();

  const [openNew, setOpenNew] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      (project.description ?? "").toLowerCase().includes(search.toLowerCase())
    );
  });

  // const onChoose: React.FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   const fd = new FormData(e.currentTarget);
  //   const chosen = String(fd.get("orgId") || "");
  //   if (chosen) {
  //     localStorage.setItem(ORG_KEY, chosen);
  //     setOrgId(chosen);
  //   }
  // };

  const handleCreate = async (values: HandleCreateProps) => {
    try {
      await createProject(values).unwrap();
      setOpenNew(false);
    } catch {
      alert("שגיאה ביצירת פרויקט");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div>
          <h1 className="text-2xl font-bold">הפרויקטים שלי</h1>
          <p className="text-gray-600 text-sm">נהל וצור פרויקטים חדשים</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="border rounded-lg px-3 py-2 w-64"
            placeholder="חפש פרויקט…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => refetch()}
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            רענן
          </button>

          <div className="flex gap-3">
            <RequirePermission perm="project.create">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">
                + פרויקט חדש
              </button>
            </RequirePermission>
          </div>

          <OrgSelector />

          <button
            onClick={() => setOpenNew(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            + פרויקט חדש
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center text-gray-600">
          <p className="mb-4">אין לך עדיין פרויקטים.</p>
          <button
            onClick={() => setOpenNew(true)}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            צור פרויקט ראשון
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}

      <NewProjectModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default ProjectsDashboard;
