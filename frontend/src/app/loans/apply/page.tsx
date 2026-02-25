import LoanForm from "@/components/forms/apply-loan";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconCloud, IconUser } from "@tabler/icons-react"
import Link from "next/link";

async function getUserDetails() {
  const res = await api("/user_details");

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch user details");

  return res.json();
}

export default async function ProfilePage() {
  const profile = await getUserDetails();

  if (!profile) return (<EmptyOutline />);

  return (<LoanForm mode="create" />);
}

export function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconUser />
        </EmptyMedia>
        <EmptyTitle>Profile Incomplete</EmptyTitle>
        <EmptyDescription>
          Complete your profile to apply for a loan.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Link href="/profile">Complete Profile</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
