import { SideNav } from "@/components/SideNav";
import { UserProvider } from "@/context/userContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="h-screen">
        <SideNav />
        <div className="sm:absolute left-24">{children}</div>
      </div>
    </UserProvider>
  );
}
