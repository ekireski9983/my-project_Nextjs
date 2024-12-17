import { Inter } from "next/font/google";
import PublicMenu from '../../components/PublicMenu'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portofolio Shiddiq",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <div className={inter.className}>
        <PublicMenu/>
        <main className="pt-5 max-w-5xl mx-auto px-6 md:px-12 xl:px-6"> 
          {children} 
        </main>
      </div>
  );
}
