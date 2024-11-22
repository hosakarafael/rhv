import NavBar from "@/components/NavBar";
import { UserProvider } from "@/context/userContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <NavBar />
      <div className="absolute h-[calc(100vh-64px)] overflow-auto w-screen dark:bg-black top-16">
        {children}
      </div>
    </UserProvider>
  );
}
