import "./globals.css";
import { PT_Sans } from "next/font/google";
import SupabaseProvider from "./supabase-provider";

const ptSans = PT_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Solicitud de registro de comercio",
  description: "Solicitud de registro de comercio",
};

export default function RootLayout({ children }) {
  //body className={ptSans.className}
  return (
    <html lang="en" className="bg-white">
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
