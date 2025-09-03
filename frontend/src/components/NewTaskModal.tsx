import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./button/Button";


const schema = z.object({
  title: z.string().min(2, "כותרת קצרה מדי"),
  description: z.string().optional(),
  status: z.enum(["todo", "inprogress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  assigneeName: z.string().optional(),
  labelsCsv: z.string().optional(),
})
.transform((v) => ({
  title: v.title,
  description: v.description,
  status: v.status,
  priority: v.priority,
  assigneeName: v.assigneeName,
  labels: v.labelsCsv
    ? v.labelsCsv.split(",").map((s) => s.trim()).filter(Boolean)
    : [] as string[],
}));

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

type NewTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormOutput) => Promise<void>;
};

const NewTaskModal = ({open, onClose, onCreate}: NewTaskModalProps) => {
  const {register,handleSubmit,formState: { errors, isSubmitting },reset} = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: { status: "todo", priority: "medium" },
    mode: "onBlur"
  });

  const submit = async (values: FormInput) => {
    const output: FormOutput = schema.parse(values);
    await onCreate(output);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">משימה חדשה</h2>
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
            <label className="block mb-1 font-medium">תיאור (אופציונלי)</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              {...register("description")}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              תגיות (מופרדות בפסיק)
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="frontend, backend, bug"
              {...register("labelsCsv")}
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
            <label className="block mb-1 font-medium">אחראי (אופציונלי)</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="שם אחראי"
              {...register("assigneeName")}
            />
          </div>
          <Button text="צור משימה" type="submit" isLoading={isSubmitting} />
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;
