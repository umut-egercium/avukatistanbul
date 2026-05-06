// Auth state + actions for AvukatIstanbul.
//
// Public API consumed by Agent 2 surfaces too; do not change shape without
// coordinating via docs/AGENT-SPLIT.md.

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AuthError, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export type UserRole = "customer" | "lawyer" | "admin";

export interface SignUpMeta {
  role: UserRole;
  full_name?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn(
    email: string,
    password: string,
  ): Promise<{ error: AuthError | null }>;
  signUp(
    email: string,
    password: string,
    meta: SignUpMeta,
  ): Promise<{ error: AuthError | null; userId: string | null }>;
  signOut(): Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const roleQuery = useQuery({
    queryKey: ["user-role", user?.id ?? null],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<UserRole | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return (data?.role ?? null) as UserRole | null;
    },
  });

  const userRole = roleQuery.data ?? null;
  const loading = authLoading || (!!user && roleQuery.isLoading);

  return {
    user,
    userRole,
    loading,

    async signIn(email, password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    },

    async signUp(email, password, meta) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      });
      return { error, userId: data.user?.id ?? null };
    },

    async signOut() {
      await supabase.auth.signOut();
    },
  };
}
