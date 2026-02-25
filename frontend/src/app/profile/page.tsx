import ProfileClient from "@/components/profile-client";
import { api } from "@/lib/api";

async function getUserDetails() {
  const res = await api("/user_details");

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch user details");

  return res.json();
}

export default async function ProfilePage() {
  const profile = await getUserDetails();

  if (!profile) return <ProfileClient profile={null} />;

  return <ProfileClient profile={profile} />;
}
