import type { Task } from "../types/task";
import Card from "./Card";

type ColumnProps = {
  title: string;
  count: number;
  tasks: Task[];
  onPatch: (taskId: string, patch: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
};

const Column = ({ title, count, tasks, onPatch, onDelete }: ColumnProps) => {
      return (
    <div className="bg-gray-50 rounded-xl p-4 border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-2xl text-blue-600">{count}</span>
      </div>

      <div className="space-y-3">
        {tasks.map(t => (
          <Card key={t._id} task={t} onPatch={onPatch} onDelete={onDelete} />
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-gray-500">אין משימות בעמודה זו</div>
        )}
      </div>
    </div>
  );
};

export default Column;
