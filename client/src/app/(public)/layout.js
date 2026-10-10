import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AosInit from "@/components/public/AosInit";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <AosInit />
        {children}
      </main>
      <Footer />
    </>
  );
}