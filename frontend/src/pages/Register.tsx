import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { useRegisterMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";

const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/;

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "שם צריך להכיל לפחות 2 תווים")
      .max(50, "שם ארוך מדי"),
    email: z.string().email("אימייל לא תקין"),
    password: z
      .string()
      .min(8, "סיסמה חייבת להיות לפחות 8 תווים")
      .regex(passwordRules, "סיסמה חייבת לכלול אות ומספר"),
    confirmPassword: z.string().min(1, "נא לאשר סיסמה"),
    acceptTos: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "הסיסמאות אינן תואמות",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("שגיאה בהרשמה", err);
    }
  };

  const handleGoogle = () => {
    window.location.href = "/api/auth/google/start";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl mb-5">הרשמה</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4 w-full"
        >
          <Input type="text" placeholder="שם מלא" {...register("name")} />
          {errors.name && (
            <p className="text-red-600 text-sm mb-3">{errors.name.message}</p>
          )}
          <Input
            type="email"
            placeholder="אימייל "
            {...register("email")}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-3">{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="סיסמה (לפחות 8 תווים, אות ומספר)"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mb-3">
              {errors.password.message}
            </p>
          )}
          <Input
            type="password"
            placeholder="אשר סיסמה"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mb-3">
              {errors.confirmPassword.message}
            </p>
          )}

          <Button text="הירשם" isLoading={isLoading} type="submit" />
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            התחבר עם Google
          </button>
        </form>
      </div>
    </div>
  );
}
