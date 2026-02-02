"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";
import { Avatar, getInitials } from "@/components/avatar";
import { LogoutButton } from "./logout-button";

export function AuthButton() {
  const { user, loading } = useAuth();
  const { profile } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <span className="border rounded px-3 py-1 text-sm hover:bg-gray-100"></span>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-3">
      <Avatar
        imageUrl={profile?.profile_picture_url ?? null}
        initials={getInitials(
          profile?.first_name ?? null,
          profile?.last_name ?? null,
          user.email
        )}
        size="sm"
      />
      <span>{user.email}</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/auth/login"
        className="border rounded px-3 py-1 text-sm hover:bg-gray-100"
      >
        Sign in
      </Link>
      <Link
        href="/auth/sign-up"
        className="bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  );
}
