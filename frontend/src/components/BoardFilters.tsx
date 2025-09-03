import { useMemo } from "react";

type BoardFiltersProps = {
  query: string;
  onQuery: (values: string) => void;
  status: ("todo" | "inprogress" | "done") | "all";
  onStatus: (v: ("todo" | "inprogress" | "done") | "all") => void;
  allLabels: string[];
  selectedLabels: string[];
  onToggleLabel: (label: string) => void;
};

const BoardFilters = ({
  query,
  onQuery,
  status,
  onStatus,
  allLabels,
  selectedLabels,
  onToggleLabel,
}: BoardFiltersProps) => {
  const hasFilters = useMemo(
    () => query || status !== "all" || selectedLabels.length > 0,
    [query, status, selectedLabels]
  );

  return (
    <div className="bg-white border rounded-xl p-3 flex flex-col md:flex-row md:items-center gap-3">
      <input
        placeholder="חפש לפי כותרת/אחראי…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full md:w-72"
      />

      <select
        value={status}
        onChange={(e) => onStatus(e.target.value as any)}
        className="border rounded-lg px-3 py-2 w-full md:w-44"
      >
        <option value="all">כל הסטטוסים</option>
        <option value="todo">To‑Do</option>
        <option value="inprogress">בתהליך</option>
        <option value="done">הושלם</option>
      </select>

      <div className="flex flex-wrap gap-2">
        {allLabels.map((l) => {
          const active = selectedLabels.includes(l);
          return (
            <button
              key={l}
              onClick={() => onToggleLabel(l)}
              className={`px-3 py-1 rounded-full text-sm border ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700"
              }`}
            >
              #{l}
            </button>
          );
        })}
      </div>

      {hasFilters && (
        <span className="md:ml-auto text-xs text-gray-500">פילטרים פעילים</span>
      )}
    </div>
  );
};

export default BoardFilters;
