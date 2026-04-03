import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/ru/login"); // proxy.ts handles locale detection before this runs
}
