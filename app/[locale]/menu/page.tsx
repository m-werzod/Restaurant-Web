import { Suspense } from "react";
import HeaderHead from "@/app/components/HeaderHead";
import Menu from "@/app/modules/menu/Menu";

export default function MenuPage() {
  return (
    <div>
      <HeaderHead />
      <Suspense>
        <Menu />
      </Suspense>
    </div>
  );
}
