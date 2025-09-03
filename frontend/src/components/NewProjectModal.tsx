import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./button/Button";

const schema = z.object({
  name: z.string().min(2, "שם קצר מדי"),
  description: z.string().optional(),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

type NewProjectModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (v: FormOutput) => Promise<void>;
};

const NewProjectModal = ({ open, onClose, onCreate }: NewProjectModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInput>({ resolver: zodResolver(schema), mode: "onBlur" });

  if (!open) return null;

  const submit = async (v: FormInput) => {
    const out: FormOutput = { name: v.name, description: v.description };
    await onCreate(out);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">פרויקט חדש</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">שם הפרויקט</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
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

          <Button text="צור פרויקט" type="submit" isLoading={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
