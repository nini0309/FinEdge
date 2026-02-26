"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteLoanButton({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await api(`/loan_applied/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete loan");
        return;
      }

      toast.success("Loan deleted successfully");
      router.push("/loans"); // redirect after delete
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button disabled={disabled} onClick={handleDelete}>
      Delete Loan
    </Button>
  );
}