import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateMeMutation } from "../../services/authApi";
import Button from "../button/Button";

const detailsSchema = z.object({
  name: z.string().min(2, "שם קצר מדי"),
  email: z.string().email("אימייל לא תקין"),
});
type DetailsInput = z.infer<typeof detailsSchema>;

const DetailsForm = ({ initial }: { initial: DetailsInput }) => {
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DetailsInput>({
    resolver: zodResolver(detailsSchema),
    defaultValues: initial,
    mode: "onBlur",
  });

  const onSubmit = async (values: DetailsInput) => {
    try {
      await updateMe(values).unwrap();
      reset(values);
      alert("הפרטים עודכנו בהצלחה");
    } catch (e: any) {
      alert(e?.data?.error || "שגיאה בעדכון פרטים");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border rounded-2xl p-6 shadow-sm space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">שם מלא</label>
        <input
          className="w-full border rounded-lg px-3 py-2"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">אימייל</label>
        <input
          className="w-full border rounded-lg px-3 py-2 ltr"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      <Button
        text="שמור שינויים"
        isLoading={isLoading || isSubmitting}
        type="submit"
      />
    </form>
  );
};

export default DetailsForm;
