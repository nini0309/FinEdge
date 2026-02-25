"use client";

import { useState } from "react";
import ProfileView from "@/components/profile-view";
import MultiForm from "@/components/forms/complete-profile";
import { useRouter } from "next/navigation";

type Props = {
  profile: any | null;
};

export default function ProfileClient({ profile }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit" | "create">(
    profile ? "view" : "create"
  );

  if (mode === "create") {
    return (
    <MultiForm
      mode="create"
      onCancel={() => router.back()}
      onSuccess={async () => {
        router.refresh();
        setMode("view")
      }}
    />
  );
  }

  if (mode === "view") {
    return (
      <ProfileView
        profile={profile}
        onEdit={() => setMode("edit")} // 🔥 THIS IS THE KEY
      />
    );
  }

  const initialData = {
    name: profile.name,
      phone: profile.phone,
      address: profile.address,
      age: profile.age,
      maritalStatus: profile.marital_status,
      urbanRural: profile.property_area ?? "",
      gender: profile.gender ?? "",
      aadhar: profile.aadhar,
      pan: profile.pan,
      dependents: profile.no_of_dependents,
      selfEmployed: profile.self_employed,
      graduate: profile.graduate,
  }
  return (
    <MultiForm
      initialData={initialData}
      mode={mode}
      onCancel={() => setMode("view")}
      onSuccess={async () => {
        await router.refresh();
        setMode("view")
      }}
    />
  );
}
