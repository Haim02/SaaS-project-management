import React, { useState } from 'react'
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from '../services/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("err", error);
    }
  };

 const handleGoogle = () => {
   window.location.href = "http://localhost:3000/api/auth/google/start";
 };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl mb-5">ברוכים השבים</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 w-full"
        >
          <Input
            type="email"
            name="email"
            placeholder="אימייל"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="סיסמה"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="התחבר" isLoading={isLoading} type="submit" />
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
          {error && <p className="text-red-600 mt-3 text-sm">שגיאת התחברות</p>}
          <div className="text-center mt-4 space-x-20">
            <a href="#" className="text-sm text-blue-500">
              שכחת סיסמה?
            </a>
            <Link to="/register" className="text-sm text-blue-500">
              אין לך חשבון? הרשמה
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
