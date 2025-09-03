import { FolderIcon } from "@heroicons/react/24/outline";

type ProjectCardProps = {
  project: {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onOpen: () => void;
};


const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{project.name}</h3>
        <FolderIcon className="h-5 w-5 text-gray-600" />
      </div>
      {project.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>
      )}
      <div className="text-xs text-gray-500 mt-1">
        עודכן:{" "}
        {project.updatedAt
          ? new Date(project.updatedAt).toLocaleString("he-IL")
          : project.createdAt
          ? new Date(project.createdAt).toLocaleString("he-IL")
          : "-"}
      </div>
      <div className="pt-2">
        <button
          onClick={onOpen}
          className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1"
        >
          היכנס ללוח →
        </button>
      </div>
    </div>
  );
};

export default ProjectCard
