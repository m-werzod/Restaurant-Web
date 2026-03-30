"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import FooterCopy from "@/app/components/FooterCopy";
import { Pochta, Telefon, RoadMap } from "@/app/assets/icons";

const API_BASE = "https://anorkhulov.uz";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Не удалось отправить сообщение. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderHead />

      <div className="bg-linear-to-r from-white/40 to-white/40 w-315 h-auto container mx-auto rounded-3xl pb-16">
        <HeaderMain />

        <p className="text-sm text-gray-500 px-10 pt-6 flex gap-1">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          ›<span className="text-black">Контакты</span>
        </p>

        <h1 className="text-5xl font-bold text-center py-10">Контакты</h1>

        <div className="flex justify-center gap-20 px-12 mb-14">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Pochta />
            </div>
            <h3 className="text-lg font-semibold">Напишите нам</h3>
            <p className="text-sm text-gray-600">info@bmgsoft.com</p>
            <p className="text-sm text-gray-600">t.me/bmgsoft.com</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Telefon />
            </div>
            <h3 className="text-lg font-semibold">Позвоните нам</h3>
            <p className="text-sm text-gray-600">+998(90)7583788</p>
            <p className="text-sm text-gray-600">+998(90)865332322</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <RoadMap />
            </div>
            <h3 className="text-lg font-semibold">Посетите нас</h3>
            <p className="text-sm text-gray-600">Узбекистан, Ташкент</p>
            <p className="text-sm text-gray-600">Улица, 24</p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-10">Написать нам</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-xl mx-auto px-8"
        >
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-black/20 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 text-base outline-none placeholder:text-gray-400 focus:border-black/40 transition"
          />
          <input
            type="email"
            placeholder="Ваш E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-black/20 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 text-base outline-none placeholder:text-gray-400 focus:border-black/40 transition"
          />
          <input
            type="tel"
            placeholder="Ваш номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-black/20 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 text-base outline-none placeholder:text-gray-400 focus:border-black/40 transition"
          />
          <textarea
            placeholder="Ваше сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full border border-black/20 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 text-base outline-none placeholder:text-gray-400 focus:border-black/40 transition resize-none"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {sent && (
            <p className="text-green-600 text-sm text-center font-medium">
              Сообщение успешно отправлено!
            </p>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-10 py-3 rounded-full text-base font-medium hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-60"
            >
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      </div>

      <FooterCopy />
    </div>
  );
};

export default Contact;
