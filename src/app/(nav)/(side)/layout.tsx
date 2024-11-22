import { SideNav } from "@/components/SideNav";
import { UserProvider } from "@/context/userContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="sm:block hidden">
        <SideNav />
      </div>
      <div className="sm:absolute left-[102px] w-[calc(100vw-102px)]">
        {children}
      </div>
    </UserProvider>
  );
}
