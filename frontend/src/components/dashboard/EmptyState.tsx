
type EmptyStateProps = {
  title: string;
  desc?: string;
  actionText?: string;
  onAction?: () => void;
};

const EmptyState = ({ title, desc, actionText, onAction }: EmptyStateProps) => {
  
  return (
    <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      {desc && <p className="text-gray-600 mt-1">{desc}</p>}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState
