import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import AdminDashboard from "./AdminDashboard";

const API_BASE = "https://anorkhulov.uz";

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

function decodeJwt(token: string): { role?: string } {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch {
    return {};
  }
}

async function fetchData<T>(path: string, token: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.data)) return json.data;
    return [];
  } catch {
    return [];
  }
}

const AdminPage = async () => {
  const [cookieStore, locale] = await Promise.all([cookies(), getLocale()]);
  const token = cookieStore.get("token")?.value;

  if (!token) redirect(`/${locale}/login`);

  const decoded = decodeJwt(token);
  if (decoded.role !== "ADMIN") redirect(`/${locale}`);

  const [cooks, customers, foodItems] = await Promise.all([
    fetchData<Cook>("/api/cook", token),
    fetchData<Customer>("/api/customer", token),
    fetchData<FoodItem>("/api/food", token),
  ]);

  return (
    <AdminDashboard
      cooks={cooks}
      customers={customers}
      foodItems={foodItems}
      apiBase={API_BASE}
      token={token}
    />
  );
};

export default AdminPage;
