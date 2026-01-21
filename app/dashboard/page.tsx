import { requireAuth } from "@/lib/auth";
import { DashboardMenu } from "./_components/dashboard-menu";

export default async function DashboardPage() {
  const user = await requireAuth();
  return (
    <>
      <div className="flex justify-end p-4">
        <DashboardMenu />
      </div>
      <main className="min-h-screen flex flex-col items-center">
        
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {user.email}</p>
      </main>
    </>
  );
}