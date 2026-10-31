import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AosInit from "@/components/public/AosInit";
import WhatsAppPopup from "@/components/layout/WhatsAppPopup";
import SocialSidebar from "@/components/layout/SocialSidebar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <AosInit />
        {children}

        <SocialSidebar />
        <WhatsAppPopup
          phone="919625870021"                    // ← change to your number
          message="Hello! I want to know more about your services."
          position="right"
        />
      </main>
      <Footer />
    </>
  );
}