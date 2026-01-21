import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Server-side function to get the currently authenticated user.
 * Redirects to login page if no user is authenticated.
 * Use this in Server Components, Server Actions, or Route Handlers.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}
