import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="absolute h-[calc(100vh-64px)] overflow-auto w-screen dark:bg-black top-16">
        {children}
      </div>
    </>
  );
}
