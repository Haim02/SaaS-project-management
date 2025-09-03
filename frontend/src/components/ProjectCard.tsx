import type { Project } from './../types/task';
import { useNavigate } from "react-router-dom";
import { TrashIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useDeleteProjectMutation } from '../services/projectApi';
import Spinner from './Spinner';

type ProjectCardProps = {
  project: Project;
  onDelete: (id: string) => void;
};

const ProjectCard = ({project, onDelete}: ProjectCardProps) => {
    const navigate = useNavigate();
    const [deleteProject, {isLoading}] = useDeleteProjectMutation();

    const handleDelete = async (projectId: string) => {
      await deleteProject({projectId}).unwrap();
    };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <button
          onClick={() => handleDelete(project._id)}
          className="text-red-600 hover:bg-red-50 rounded p-1"
          title="מחק פרויקט"
        >
          {isLoading ? <Spinner /> : <TrashIcon className="h-5 w-5" />}
        </button>
      </div>

      {project.description && (
        <p className="text-sm text-gray-600">{project.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          נוצר:{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString("he-IL")
            : "-"}
        </span>
        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          className="inline-flex items-center gap-1 text-blue-700 hover:underline"
        >
          היכנס לפרויקט <ArrowLeftCircleIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default ProjectCard
