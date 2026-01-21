import { requireAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { DashboardMenu } from "@/app/dashboard/_components/dashboard-menu";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await requireAuth();
  const supabase = await createClient();

  // Fetch profile from profiles table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  return (
    <>
      <div className="flex justify-end p-4">
        <DashboardMenu />
      </div>
      <main className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6">Profile</h1>
          {error ? (
            <div className="border rounded p-4">
              <p className="text-red-500 mb-2">Error loading profile</p>
              <p className="text-sm text-gray-600">{error.message}</p>
            </div>
          ) : profile ? (
            <div className="border rounded p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="mt-1">{user.email}</p>
              </div>
              {profile.first_name && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    First Name
                  </label>
                  <p className="mt-1">{profile.first_name}</p>
                </div>
              )}
              {profile.last_name && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Last Name
                  </label>
                  <p className="mt-1">{profile.last_name}</p>
                </div>
              )}
              {profile.created_at && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Member Since
                  </label>
                  <p className="mt-1">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded p-4">
              <p className="text-gray-600">No profile found.</p>
            </div>
          )}
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="text-blue-600 hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
