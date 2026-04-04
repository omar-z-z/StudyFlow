import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-0 pt-8 md:pt-0">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
