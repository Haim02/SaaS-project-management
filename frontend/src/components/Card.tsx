import { TrashIcon } from "@heroicons/react/24/outline";
import type { Task, TaskStatus } from "../types/task";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type CardProps = {
  task: Task;
  onPatch: (taskId: string, patch: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
};


const status = (priority: Task["priority"]) => {
  switch (priority) {
    case "low":
      return <ExclamationTriangleIcon className="h-6 w-6 text-green-500" />;
      break;
    case "medium":
      return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      break;
    case "high":
      return <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />;
      break;
    case undefined:
      return <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />;
      break;
  }
}

const ReturnPriority = ({ priority }: { priority: Task["priority"] }) => {
  return status(priority);
};


const Card = ({ task, onPatch, onDelete }: CardProps) => {
  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="font-medium text-gray-900 flex">
          {task.title}
          <ReturnPriority priority={task.priority} />
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:bg-red-50 rounded p-1"
          title="מחק"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <select
          className="border rounded-lg px-2 py-1 text-sm"
          value={task.status}
          onChange={(e) =>
            onPatch(task._id, { status: e.target.value as TaskStatus })
          }
        >
          <option value="todo">To-Do</option>
          <option value="inprogress">בתהליך</option>
          <option value="done">הושלם</option>
        </select>

        <select
          className="border rounded-lg px-2 py-1 text-sm"
          value={task.priority ?? "medium"}
          onChange={(e) =>
            onPatch(task._id, { priority: e.target.value as Task["priority"] })
          }
        >
          <option value="low">נמוכה</option>
          <option value="medium">בינונית</option>
          <option value="high">גבוהה</option>
        </select>

        <input
          className="border rounded-lg px-2 py-1 text-sm"
          placeholder="אחראי"
          defaultValue={task.assigneeName ?? ""}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v !== (task.assigneeName ?? "")) {
              onPatch(task._id, { assigneeName: v || undefined });
            }
          }}
        />
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.map((l) => (
            <span
              key={l}
              className="text-xs bg-gray-100 border px-2 py-0.5 rounded-full"
            >
              #{l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
