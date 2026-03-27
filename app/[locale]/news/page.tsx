import HeaderHead from "@/app/components/HeaderHead";
import HeaderMain from "@/app/components/HeaderMain";
import News from "@/app/modules/news/News";

export default function NewsPage() {
  return (
    <div>
      <HeaderHead />
      <HeaderMain />
      <News />
    </div>
  );
}
