"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ForkSpoon } from "@/app/assets/icons";

export default function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ru";

  useEffect(() => {
    const hasToken = document.cookie.split(";").some((c) => c.trim().startsWith("token="));
    if (hasToken) {
      router.replace(`/${locale}`);
    }
  }, [locale, router]);

  const [, setCookie] = useCookies(["token"]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setCookie("token", data.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
      });

      let role = "CUSTOMER";
      try {
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        role = payload.role ?? "CUSTOMER";
      } catch {}

      if (role === "ADMIN") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">

      <div className="relative z-10 w-full max-w-sm mx-4 rounded-3xl bg-white/40 backdrop-blur-md shadow-xl px-10 py-10 flex flex-col items-center">
        <div className="w-25 h-25 rounded-full bg-black flex items-center justify-center mb-6 -mt-16 shadow-lg">
          <ForkSpoon />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8 self-start">
          {t("title")}
        </h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <input
            type="text"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <p className="text-xs text-gray-500 -mt-3 cursor-pointer hover:underline self-start">
            {t("forgot")}
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
              t("button")
            )}
          </button>
        </form>

        <Link
          href={`/${locale}/register`}
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          {t("noAccount")}
        </Link>
      </div>
    </div>
  );
}
