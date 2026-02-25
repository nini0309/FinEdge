import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api";

type Loan = {
  id: number
  applicant_income: number
  coapplicant_income: number
  loan_amount: number
  loan_amount_term: number
  credit_history: boolean
  applied_at: string
  loan_status: string
}

async function getLoans(): Promise<Loan[]> {
  const res = await api("/loan_applied", {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch loans")
  }

  return res.json()
}

export default async function LoansPage() {
  const loans = await getLoans()

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">My Loans</h1>

      {loans.length === 0 && (
        <p className="text-muted-foreground">No loans found.</p>
      )}

      {loans.map((loan) => (
        <Card key={loan.id} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Loan #{loan.id}</CardTitle>
            <StatusBadge status={loan.loan_status} />
          </CardHeader>

          <Separator />

          <CardContent className="pt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Applicant Income</p>
              <p className="font-medium">₹{loan.applicant_income}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Co-Applicant Income</p>
              <p className="font-medium">₹{loan.coapplicant_income}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Loan Amount</p>
              <p className="font-medium">₹{loan.loan_amount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Term (months)</p>
              <p className="font-medium">{loan.loan_amount_term}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Credit History</p>
              <p className="font-medium">
                {loan.credit_history ? "Good" : "Poor"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Applied At</p>
              <p className="font-medium">
                {new Date(loan.applied_at).toLocaleString()}
              </p>
            </div>

            <div className="col-span-2 flex justify-end pt-4">
              <Button asChild>
                <a href={`/loans/${loan.id}`}>View Details</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Loan["loan_status"] }) {
  if (status.toLowerCase() === "approved")
    return <Badge className="bg-green-600">Approved</Badge>

  if (status.toLowerCase() === "rejected")
    return <Badge variant="destructive">Rejected</Badge>

  return <Badge variant="secondary">Pending</Badge>
}