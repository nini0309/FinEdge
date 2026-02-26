import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import DeleteLoanButton from "@/components/delete-loan-button";

type Loan = {
  id: number;
  applicant_income: number;
  coapplicant_income: number;
  loan_amount: number;
  loan_amount_term: number;
  credit_history: boolean;
  applied_at: string;
  loan_status: string;
};

async function getLoan(id: string): Promise<Loan> {
  const res = await api(`/loan_applied/${id}`, {
    method: "GET",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch loan");
  }

  return res.json();
}

export default async function LoanDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const loan = await getLoan(id);

  const isDisabled = loan.loan_status.toLowerCase() !== "pending";

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Loan #{loan.id}</CardTitle>
          <StatusBadge status={loan.loan_status} />
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <Detail
            label="Applicant Income"
            value={`₹${loan.applicant_income}`}
          />
          <Detail
            label="Co-Applicant Income"
            value={`₹${loan.coapplicant_income}`}
          />
          <Detail label="Loan Amount" value={`₹${loan.loan_amount}`} />
          <Detail label="Loan Term" value={`${loan.loan_amount_term} months`} />
          <Detail
            label="Credit History"
            value={loan.credit_history ? "Good" : "Poor"}
          />
          <Detail
            label="Applied At"
            value={new Date(loan.applied_at).toLocaleString()}
          />

          <div className="pt-4">
            <DeleteLoanButton id={loan.id} disabled={isDisabled} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status.toLowerCase() === "approved")
    return <Badge className="bg-green-600">Approved</Badge>;

  if (status.toLowerCase() === "rejected")
    return <Badge variant="destructive">Rejected</Badge>;

  return <Badge variant="secondary">Pending</Badge>;
}
