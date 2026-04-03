import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {children}
    </div>
  );
};

export default MainLayout;
