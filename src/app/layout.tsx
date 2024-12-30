import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { SidebarProvider } from "@/context/sidebarContext";
import { ThemeProvider } from "@/context/themeContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${process.env.APP_NAME}  ${process.env.APP_VERSION}`,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <UserProvider>
          <SidebarProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
