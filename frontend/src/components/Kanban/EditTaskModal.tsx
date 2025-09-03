import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { TaskStatus } from "../../types/task";
import CommentsPanel from "../CommentsPanel";

const schema = z.object({
  title: z.string().min(2, "כותרת קצרה מדי"),
  description: z.string().optional(),
  status: z.enum(["todo", "inprogress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  assigneeName: z.string().optional(),
  labelsCsv: z.string().optional(),
});
type FormInput = z.input<typeof schema>;
type FormOutput = {
  title: string;
  description?: string;
  status: "todo" | "inprogress" | "done";
  priority?: "low" | "medium" | "high";
  assigneeName?: string;
  labels?: string[];
};

type EditTaskModalProps = {
  open: boolean;
  initial: {
    _id?: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority?: "low" | "medium" | "high";
    assigneeName?: string;
    labels?: string[];
  } | null;
  onClose: () => void;
  onSave: (value: FormOutput) => Promise<void>;
  onDelete: () => Promise<void>;
};

const EditTaskModal = ({open, initial, onClose, onSave, onDelete, }: EditTaskModalProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<FormInput>({
      resolver: zodResolver(schema),
      values: initial
        ? {
            title: initial.title,
            description: initial.description,
            status: initial.status,
            priority: initial.priority ?? "medium",
            assigneeName: initial.assigneeName,
            labelsCsv: initial.labels?.join(", ") ?? "",
          }
        : undefined,
      mode: "onBlur",
    });

  if (!open || !initial) return null;

  const submit = async (v: FormInput) => {
    const out: FormOutput = {
      title: v.title,
      description: v.description,
      status: v.status ?? "todo",
      priority: v.priority ?? "medium",
      assigneeName: v.assigneeName,
      labels: v.labelsCsv
        ? v.labelsCsv
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };
    await onSave(out);
    reset(out);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">עריכת משימה</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">כותרת</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">תיאור</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium">סטטוס</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                {...register("status")}
              >
                <option value="todo">To‑Do</option>
                <option value="inprogress">בתהליך</option>
                <option value="done">הושלם</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">עדיפות</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                {...register("priority")}
              >
                <option value="low">נמוכה</option>
                <option value="medium">בינונית</option>
                <option value="high">גבוהה</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">אחראי</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              {...register("assigneeName")}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={async () => {
                await onDelete();
                onClose();
              }}
              className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded"
            >
              <TrashIcon className="h-5 w-5" /> מחק משימה
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border"
              >
                בטל
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                שמור
              </button>
            </div>
          </div>
        </form>
        <CommentsPanel taskId={(initial as any)._id} />
      </div>
    </div>
  );
}

export default  EditTaskModal