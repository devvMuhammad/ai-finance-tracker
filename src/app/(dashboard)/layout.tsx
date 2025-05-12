import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar className="hidden md:flex fixed h-screen z-10" />
      <div className="flex-1 md:ml-64">
        <main className="h-screen overflow-y-auto bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
} 