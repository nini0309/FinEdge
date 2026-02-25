"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include", // IMPORTANT for cookies
      });

      if (!res.ok) {
        toast.error("Logout failed");
      }
      else {
        toast.success("Logout successful");
      }

      router.push("/login");
      router.refresh(); // ensures middleware re-runs
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleLogout} className={className}>
      <Power />
    </Button>
  );
}
