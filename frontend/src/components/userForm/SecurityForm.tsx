import z from "zod";
import { useChangePasswordMutation } from "../../services/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const pwdSchema = z
  .object({
    currentPassword: z.string().min(6, "לפחות 6 תווים"),
    newPassword: z.string().min(6, "לפחות 6 תווים"),
    confirm: z.string().min(6, "לפחות 6 תווים"),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: "אימות סיסמה לא תואם",
    path: ["confirm"],
  });

type PwdInput = z.infer<typeof pwdSchema>;

const SecurityForm = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<PwdInput>({
        resolver: zodResolver(pwdSchema),
        mode: "onBlur",
      });

    const onSubmit = async(values: PwdInput) => {
          try {
            await changePassword({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }).unwrap();
            alert("הסיסמה עודכנה בהצלחה");
            reset({ currentPassword: "", newPassword: "", confirm: "" });
          } catch (e: any) {
            alert(e?.data?.error || "שגיאה בעדכון סיסמה");
          }
        }


  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-4 max-w-xl"
      >
        <div>
          <label className="block mb-1 font-medium">סיסמה נוכחית</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 ltr"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-600 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">סיסמה חדשה</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 ltr"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">אימות סיסמה חדשה</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 ltr"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-red-600 text-sm">{errors.confirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center"
        >
          {(isSubmitting || isLoading) && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          עדכן סיסמה
        </button>
      </form>
    </div>
  );
}

export default SecurityForm
