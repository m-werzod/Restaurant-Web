"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("register");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ru";

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRegister(e: { preventDefault(): void }) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("errors.passwordMismatch"));
      return;
    }
    if (!agreed) {
      setError(t("errors.agreeRequired"));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, username, password }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      router.push(`/${locale}/login`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
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

      <div className="relative z-10 w-full max-w-sm mx-4 rounded-3xl bg-white/40 backdrop-blur-md shadow-xl px-10 py-10 flex flex-col items-center my-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 self-start">
          {t("title")}
        </h1>

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-6">
          <input
            type="text"
            placeholder={t("firstName")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <input
            type="text"
            placeholder={t("lastName")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

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

          <input
            type="password"
            placeholder={t("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="bg-transparent border-b border-gray-400 outline-none py-2 text-gray-700 placeholder-gray-400 text-sm"
          />

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-black"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              {t("agree")}
            </span>
          </label>

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
          href={`/${locale}/login`}
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          {t("hasAccount")}
        </Link>
      </div>
    </div>
  );
}
