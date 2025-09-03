import {SortableContext, verticalListSortingStrategy,} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import type { Task } from "../../types/task";

type KanbanColumnProps = {
  title: string;
  tasks: Task[];
};

const KanbanColumn = ({title, tasks}: KanbanColumnProps) => {

  return (
    <div className="bg-gray-50 rounded-xl p-3 border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-xs text-gray-500">{tasks.length}</span>
      </div>
      <div className="space-y-3 min-h-[120px]">
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              assignee={task.assigneeName}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
