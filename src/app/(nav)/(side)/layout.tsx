import { SideNav } from "@/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sm:block hidden">
        <SideNav />
      </div>
      <div className="sm:absolute left-[102px] sm:w-[calc(100vw-102px)]">
        {children}
      </div>
    </>
  );
}
