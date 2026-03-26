"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { ForkSpoon } from "@/app/assets/icons";

export default function LoginForm() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, // ✅ correct endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setCookie("token", data.accessToken, {
        // ✅ accessToken not token
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />

      <div className="relative z-10 w-full max-w-sm mx-4 rounded-3xl bg-white/40 backdrop-blur-md shadow-xl px-10 py-10 flex flex-col items-center">
        <div className="w-25 h-25 rounded-full bg-black flex items-center justify-center mb-6 -mt-16 shadow-lg">
          <ForkSpoon />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8 self-start">
          Вход в аккаунт
        </h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <input
            type="text"
            placeholder="Ваше имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <p className="text-xs text-gray-500 -mt-3 cursor-pointer hover:underline self-start">
            Забыли пароль?
          </p>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-3 text-sm font-medium mt-2 hover:bg-gray-800 transition disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              "Вход в аккаунт"
            )}
          </button>
        </form>

        <Link
          href="/register"
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          Еще нет учетной записи?
        </Link>
      </div>
    </div>
  );
}
