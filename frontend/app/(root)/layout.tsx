import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 md:ml-0 pt-14 md:pt-0 h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
