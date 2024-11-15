import NavBar from "@/components/NavBar";
import { UserProvider } from "@/context/userContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div>
        <NavBar />
        {children}
      </div>
    </UserProvider>
  );
}
