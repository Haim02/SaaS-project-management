import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrganizationMutation } from "../../services/organizationApi";
import Button from "../button/Button";

export const ORG_KEY = "active_org_id";
export const setActiveOrg = (id: string) => localStorage.setItem(ORG_KEY, id);

const schema = z.object({
  name: z.string().min(2, "שם ארגון קצר מדי"),
  description: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof schema>;

export default function CreateOrganization() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [createOrg, { error }] = useCreateOrganizationMutation();

  const submit = async (v: FormValues) => {
    try {
      const res = await createOrg(v).unwrap();
      if (res?._id) {
        setActiveOrg(res._id);
        nav("/");
      }
    } catch {}
  };

  return (
    <div dir="rtl" className="min-h-[60vh] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h1 className="text-xl font-bold mb-4">יצירת ארגון חדש</h1>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">שם ארגון</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">תיאור (אופציונלי)</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button text="צור ארגון" type="submit" isLoading={isSubmitting} />

          {error ? (
            <p className="text-sm text-red-600 mt-2">לא הצלחנו ליצור ארגון</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
