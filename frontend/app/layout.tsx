import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { cookies } from "next/headers";
import { NotificationProvider } from "@/lib/notification-context";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyFlow",
  description:
    "A study planner and task manager built for university students.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("studyflow-theme")?.value ?? "light";
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${theme === "dark" ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <NotificationProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={4000}
              theme={theme === "dark" ? "dark" : "light"}
            />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
