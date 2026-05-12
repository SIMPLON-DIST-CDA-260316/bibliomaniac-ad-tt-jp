import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import type React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 w-full">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
