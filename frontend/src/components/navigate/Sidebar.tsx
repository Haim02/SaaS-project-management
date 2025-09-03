import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../../services/authApi";
import { useGetProjectsQuery } from "../../services/projectApi";
import { FolderIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Spinner from './../Spinner';
import Button from "../button/Button";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId: activeId } = useParams();
  const [logout] = useLogoutMutation();
  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const sort = q.trim().toLowerCase();
    if (!sort) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(sort) ||
        (p.description ?? "").toLowerCase().includes(sort)
    );
  }, [projects, q]);

  const handleLogout = async() => {
    await logout().unwrap()
    navigate("/");
  }

  useEffect(() => {
    if (open) onClose();
  }, [location.pathname]);

  const panel =
    "fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white border-l shadow-xl z-50 transition-transform duration-200";
  const hidden = open ? "translate-x-0" : "translate-x-full";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-label="סגור סרגל צד"
        />
      )}

      <aside
        className={`${panel} ${hidden}`}
        dir="rtl"
        role="complementary"
        aria-label="סרגל צד"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">הפרויקטים שלי</h2>
          <div className="flex gap-2">
            <button
              onClick={() => refetch()}
              className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
            >
              רענן
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-1 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700"
              title="צור/נהל פרויקטים"
            >
              <PlusCircleIcon className="h-5 w-5" />
              ניהול
            </button>
          </div>
        </div>

        <div className="p-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חפש פרויקט…"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="px-2 pb-4 overflow-y-auto h-[calc(100%-110px)] flex flex-col justify-between">
          {isLoading && <Spinner />}

          {isError && (
            <div className="p-4 text-red-600 text-sm">
              שגיאה בטעינת פרויקטים. נסה לרענן.
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="p-4 text-gray-600 text-sm">
              לא נמצאו פרויקטים תואמים.
            </div>
          )}

          <ul className="space-y-1">
            {filtered.map((p) => {
              const active = p._id === activeId;
              return (
                <li key={p._id}>
                  <button
                    onClick={() => navigate(`/projects/${p._id}`)}
                    className={`w-full text-right flex items-center gap-2 px-3 py-2 rounded-lg border
                      ${
                        active
                          ? "bg-blue-50 border-blue-300 text-blue-800"
                          : "hover:bg-gray-50"
                      }
                    `}
                    title={p.name}
                  >
                    <FolderIcon className="h-5 w-5" />
                    <span className="line-clamp-1">{p.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <Button text="התנתק" onClick={handleLogout} type="button" className="bg-red-600 hover:bg-red-400" />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
