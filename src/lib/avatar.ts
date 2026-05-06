import { supabase } from "@/integrations/supabase/client";

const AVATAR_BUCKET = "lawyer-avatars";

/**
 * Build a public URL for a lawyer-avatars bucket path.
 * Returns null when path is missing or when the URL cannot be derived.
 */
export function getAvatarPublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
  return data.publicUrl ?? null;
}

/**
 * Upload an avatar to lawyer-avatars/<userId>/avatar-<ts>.<ext>.
 * Returns the storage path on success.
 */
export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ path: string | null; error: Error | null }> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/avatar-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: true });
  if (error) return { path: null, error };
  return { path, error: null };
}

/** Initials fallback when avatar_url is missing. */
export function initialsFromName(fullName: string | null | undefined): string {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
