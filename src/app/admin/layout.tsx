import { DashboardSidebar } from '@/src/components/dashboard-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside
        className="hidden lg:block w-64 shrink-0 bg-white sticky top-0 h-screen overflow-y-auto"
        style={{ borderRight: '1px solid #ede8df' }}
      >
        <DashboardSidebar />
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
