import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Bron from "../modules/main/Bron";
import CarouselSide from "../modules/main/CarouselSide";
import Footer from "../modules/main/footer";
import Gallery from "../modules/main/Gallery";
import Info from "../modules/main/Info";
import Main from "../modules/main/Main";

const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect(`/${locale}/login`);
  }

  return (
    <div>
      <Main />
      <CarouselSide />
      <Bron />
      <Info />
      <Gallery />
      <Footer />
    </div>
  );
};

export default page;
