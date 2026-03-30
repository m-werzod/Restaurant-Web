"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

type Cook = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
};

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

type Tab = "dashboard" | "food" | "staff" | "customers";

type Props = {
  cooks: Cook[];
  customers: Customer[];
  foodItems: FoodItem[];
  apiBase: string;
  token: string;
};

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "Панель",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: "food",
    label: "Меню",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    id: "staff",
    label: "Персонал",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "customers",
    label: "Клиенты",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

const CATEGORIES = ["Первые блюда", "Вторые блюда", "Салаты", "Напитки", "Фаст-фуд"];
const emptyFood: Omit<FoodItem, "id"> = { name: "", description: "", price: 0, category: CATEGORIES[0], image: "" };

const AdminDashboard = ({ cooks, customers, foodItems: initialFood, apiBase, token }: Props) => {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["token"]);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFood);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [foodForm, setFoodForm] = useState<Omit<FoodItem, "id">>(emptyFood);
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodError, setFoodError] = useState("");

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({ firstName: "", lastName: "", position: "", avatar: "" });
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffError, setStaffError] = useState("");
  const [localCooks, setLocalCooks] = useState<Cook[]>(cooks);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    router.push("/ru/login");
  };

  const openAddFood = () => {
    setEditingFood(null);
    setFoodForm(emptyFood);
    setFoodError("");
    setShowFoodModal(true);
  };

  const openEditFood = (item: FoodItem) => {
    setEditingFood(item);
    setFoodForm({ name: item.name, description: item.description, price: item.price, category: item.category, image: item.image });
    setFoodError("");
    setShowFoodModal(true);
  };

  const submitFood = async () => {
    if (!foodForm.name.trim() || foodForm.price <= 0) {
      setFoodError("Заполните название и цену");
      return;
    }
    setFoodLoading(true);
    setFoodError("");
    try {
      const method = editingFood ? "PUT" : "POST";
      const url = editingFood ? `${apiBase}/api/food/${editingFood.id}` : `${apiBase}/api/food`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(foodForm),
      });
      if (!res.ok) throw new Error();
      const saved: FoodItem = await res.json();
      if (editingFood) {
        setFoodItems((prev) => prev.map((f) => (f.id === saved.id ? saved : f)));
      } else {
        setFoodItems((prev) => [...prev, saved]);
      }
    } catch {
      // Optimistic UI fallback
      if (editingFood) {
        setFoodItems((prev) => prev.map((f) => (f.id === editingFood.id ? { ...foodForm, id: editingFood.id } : f)));
      } else {
        setFoodItems((prev) => [...prev, { ...foodForm, id: Date.now() }]);
      }
    } finally {
      setFoodLoading(false);
      setShowFoodModal(false);
    }
  };

  const deleteFood = async (id: number) => {
    if (!confirm("Удалить блюдо?")) return;
    try {
      await fetch(`${apiBase}/api/food/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setFoodItems((prev) => prev.filter((f) => f.id !== id));
  };

  const submitStaff = async () => {
    if (!staffForm.firstName.trim() || !staffForm.lastName.trim()) {
      setStaffError("Введите имя и фамилию");
      return;
    }
    setStaffLoading(true);
    setStaffError("");
    try {
      const res = await fetch(`${apiBase}/api/cook`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(staffForm),
      });
      if (!res.ok) throw new Error();
      const saved: Cook = await res.json();
      setLocalCooks((prev) => [...prev, saved]);
    } catch {
      setLocalCooks((prev) => [...prev, { ...staffForm, id: Date.now() }]);
    } finally {
      setStaffLoading(false);
      setShowStaffModal(false);
      setStaffForm({ firstName: "", lastName: "", position: "", avatar: "" });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 bg-black text-white flex flex-col transition-all duration-300`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm">R</div>
          {sidebarOpen && <span className="font-bold text-lg truncate">Restaurant</span>}
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition cursor-pointer text-left
                ${activeTab === item.id ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-2 pb-4">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {sidebarOpen
                ? <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7"/>
                : <path d="M13 5l7 7-7 7M6 5l7 7-7 7"/>}
            </svg>
            {sidebarOpen && <span className="text-sm">Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {NAV.find((n) => n.id === activeTab)?.label}
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition cursor-pointer font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Выйти
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">

          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Блюд в меню", value: foodItems.length, color: "bg-orange-50 text-orange-600", icon: "🍽️" },
                  { label: "Поваров", value: localCooks.length, color: "bg-amber-50 text-amber-600", icon: "👨‍🍳" },
                  { label: "Клиентов", value: customers.length, color: "bg-blue-50 text-blue-600", icon: "👥" },
                  { label: "Сотрудников", value: localCooks.length, color: "bg-green-50 text-green-600", icon: "🏢" },
                ].map((s) => (
                  <div key={s.label} className={`${s.color} rounded-2xl p-5 flex items-center gap-4`}>
                    <span className="text-3xl">{s.icon}</span>
                    <div>
                      <div className="text-3xl font-bold">{s.value}</div>
                      <div className="text-sm font-medium opacity-80">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Быстрые действия</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => { setActiveTab("food"); openAddFood(); }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition text-left cursor-pointer"
                    >
                      <span className="text-2xl">🍽️</span>
                      <div>
                        <div className="font-semibold text-sm">Добавить блюдо</div>
                        <div className="text-xs text-gray-400">Новый пункт меню</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { setActiveTab("staff"); setStaffError(""); setShowStaffModal(true); }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition text-left cursor-pointer"
                    >
                      <span className="text-2xl">👨‍🍳</span>
                      <div>
                        <div className="font-semibold text-sm">Добавить сотрудника</div>
                        <div className="text-xs text-gray-400">Новый повар / персонал</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Последние клиенты</h3>
                  <div className="flex flex-col gap-2">
                    {customers.slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                          {c.firstName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{c.firstName} {c.lastName}</div>
                          <div className="text-xs text-gray-400 truncate">{c.email}</div>
                        </div>
                      </div>
                    ))}
                    {customers.length === 0 && <p className="text-sm text-gray-400">Нет клиентов</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "food" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{foodItems.length} блюд</p>
                <button
                  onClick={openAddFood}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Добавить блюдо
                </button>
              </div>

              {foodItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                  <span className="text-6xl">🍽️</span>
                  <p className="font-medium">Меню пустое</p>
                  <button onClick={openAddFood} className="text-sm text-black underline cursor-pointer">Добавить первое блюдо</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="h-36 bg-gray-100 flex items-center justify-center text-5xl">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : "🍽️"}
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold truncate">{item.name}</h3>
                          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full shrink-0 font-medium">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">${Number(item.price).toFixed(2)}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditFood(item)}
                              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer font-medium"
                            >Изменить</button>
                            <button
                              onClick={() => deleteFood(item.id)}
                              className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer font-medium"
                            >Удалить</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "staff" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{localCooks.length} сотрудников</p>
                <button
                  onClick={() => { setStaffError(""); setShowStaffModal(true); }}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Добавить сотрудника
                </button>
              </div>

              {localCooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                  <span className="text-6xl">👨‍🍳</span>
                  <p>Нет сотрудников</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localCooks.map((cook) => (
                    <div key={cook.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-orange-100">
                        {cook.avatar ? (
                          <img src={`${apiBase}/${cook.avatar}`} alt={`${cook.firstName} ${cook.lastName}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-orange-50 flex items-center justify-center text-2xl font-bold text-orange-400">
                            {cook.firstName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold truncate">{cook.firstName} {cook.lastName}</p>
                        <p className="text-sm text-gray-400 truncate">{cook.position || "Без должности"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "customers" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-500">{customers.length} клиентов</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-gray-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-medium">#</th>
                      <th className="px-6 py-3 font-medium">Имя</th>
                      <th className="px-6 py-3 font-medium">Username</th>
                      <th className="px-6 py-3 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c, i) => (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">
                              {c.firstName.charAt(0)}
                            </div>
                            <span className="font-medium">{c.firstName} {c.lastName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">@{c.username}</td>
                        <td className="px-6 py-4 text-gray-500">{c.email}</td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-16 text-center text-gray-400">Нет клиентов</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Food Modal */}
      {showFoodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-lg">{editingFood ? "Изменить блюдо" : "Новое блюдо"}</h3>
              <button onClick={() => setShowFoodModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {foodError && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{foodError}</p>}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Название *</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Куриный суп"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Описание</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition resize-none"
                  rows={2}
                  value={foodForm.description}
                  onChange={(e) => setFoodForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Острый с чесноком..."
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Цена ($) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                    value={foodForm.price}
                    onChange={(e) => setFoodForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Категория</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition bg-white"
                    value={foodForm.category}
                    onChange={(e) => setFoodForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">URL изображения</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                  value={foodForm.image}
                  onChange={(e) => setFoodForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={() => setShowFoodModal(false)}
                className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >Отмена</button>
              <button
                onClick={submitFood}
                disabled={foodLoading}
                className="flex-1 bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
              >{foodLoading ? "Сохранение..." : editingFood ? "Сохранить" : "Добавить"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-lg">Новый сотрудник</h3>
              <button onClick={() => setShowStaffModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {staffError && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{staffError}</p>}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Имя *</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                    value={staffForm.firstName}
                    onChange={(e) => setStaffForm((f) => ({ ...f, firstName: e.target.value }))}
                    placeholder="Иван"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Фамилия *</label>
                  <input
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                    value={staffForm.lastName}
                    onChange={(e) => setStaffForm((f) => ({ ...f, lastName: e.target.value }))}
                    placeholder="Петров"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Должность</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                  value={staffForm.position}
                  onChange={(e) => setStaffForm((f) => ({ ...f, position: e.target.value }))}
                  placeholder="Шеф-повар"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">URL аватара</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                  value={staffForm.avatar}
                  onChange={(e) => setStaffForm((f) => ({ ...f, avatar: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={() => setShowStaffModal(false)}
                className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >Отмена</button>
              <button
                onClick={submitStaff}
                disabled={staffLoading}
                className="flex-1 bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
              >{staffLoading ? "Сохранение..." : "Добавить"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
