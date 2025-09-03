import type { IconType } from "../../types/icon";

type StatCardProps = {
  title: string;
  value: number;
  icon: IconType;
  loading?: boolean;
};

const StatCard = ({ title, value, icon: Icon, loading }: StatCardProps) => {
  
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl p-2 bg-blue-50 border">
          <Icon className="h-6 w-6 text-blue-700" />
        </div>
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          {loading ? (
            <div className="mt-1 h-6 w-16 rounded bg-gray-100 animate-pulse" />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
