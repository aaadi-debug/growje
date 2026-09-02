// client/src/app/layout.js
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: "Growje",
  description:
    "Growje — Creative digital agency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {/* <main> */}
          {children}
        {/* </main> */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}