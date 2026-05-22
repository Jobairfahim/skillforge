import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardTopBar } from '@/components/layout/DashboardTopBar';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar type="instructor" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardTopBar title="Instructor Hub" />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
