import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FlagIcon, UserCircleIcon } from "@heroicons/react/24/outline";

type TaskCardProps = {
  id: string;
  title?: string;
  assignee?: string;
  priority?: "low" | "medium" | "high";
  onOpen?: (taskId: string) => void;
  labels?: string[];
};

const TaskCard = ({ id, title, assignee, priority, onOpen, labels }: TaskCardProps) => {
    const {attributes,listeners,setNodeRef,transform,transition,isDragging} = useSortable({ id });
    const style = {transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1};
    const priorityColor =
      priority === "high"
        ? "bg-red-100 text-red-700"
        : priority === "low"
        ? "bg-gray-100 text-gray-600"
        : "bg-yellow-100 text-yellow-700";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onOpen?.(id)} 
      className="bg-white border rounded-lg p-3 shadow-sm hover:shadow transition cursor-pointer"
    >
      {labels && labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {labels.map((l) => (
            <span
              key={l}
              className="text-xs bg-gray-100 border px-2 py-0.5 rounded-full"
            >
              #{l}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900">{title}</div>
        <span
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${priorityColor}`}
        >
          <FlagIcon className="h-3.5 w-3.5" />
          {priority === "high"
            ? "גבוהה"
            : priority === "low"
            ? "נמוכה"
            : "בינונית"}
        </span>
      </div>
      {assignee && (
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <UserCircleIcon className="h-4 w-4" />
          {assignee}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
