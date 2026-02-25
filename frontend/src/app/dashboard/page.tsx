"use client";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        console.log("CLICKED");
        toast.success("Works?");
      }}
    >
      <Power />
    </Button>
  );
}
