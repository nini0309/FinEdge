"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

export const loanSchema = z.object({
  loan_amount: z.coerce.number<number>(),
  loan_amount_term: z.coerce.number<number>(),
  applicant_income: z.coerce.number<number>(),
  coapplicant_income: z.coerce.number<number>(),
  credit_history: z.boolean(),
});

// 2️⃣ Infer TypeScript type from schema
export type LoanFormValues = z.infer<typeof loanSchema>;

type Props = {
  mode?: "create" | "edit";
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
};

// 3️⃣ Custom hook (logic only)
export default function LoanForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const router = useRouter();
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loan_amount: 0,
      loan_amount_term: 0,
      applicant_income: 0,
      coapplicant_income: 0,
      credit_history: false,
    },
  });

  const onSubmit = async (values: LoanFormValues) => {
    const response = await api("/loan_applied", {
      method: mode === "edit" ? "PATCH" : "POST",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Something went wrong");
      throw new Error("Invalid values");
    }

    toast.success("Loan applied successfully");
    onSuccess?.();
    router.push("/loans");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="w-full sm:max-w-md my-10 mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Apply for a new loan</CardTitle>
        <CardDescription>
          Fill the details below to apply for a loan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            toast.error(
              Object.values(errors)
                .map((e: any) => e?.message)
                .filter(Boolean)
                .join("\n"),
            ),
          )}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="loan_amount">Loan Amount</FieldLabel>
              <Input
                id="loan_amount"
                type="number"
                {...register("loan_amount")}
              />
              {errors.loan_amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loan_amount.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="loan_amount_term">Loan Term(in months)</FieldLabel>
              <Input
                id="loan_amount_term"
                type="number"
                {...register("loan_amount_term")}
              />
              {errors.loan_amount_term && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loan_amount_term.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="applicant_income">Applicant Income</FieldLabel>
              <Input
                id="applicant_income"
                type="number"
                {...register("applicant_income")}
              />
              {errors.loan_amount_term && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loan_amount_term.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="coapplicant_income">Co-Applicant Income</FieldLabel>
              <Input
                id="coapplicant_income"
                type="number"
                placeholder="Co-Applicant Income"
                {...register("coapplicant_income")}
              />
              {errors.loan_amount_term && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loan_amount_term.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="credit_history">
                Credit score more than 600?
              </FieldLabel>
              <Switch id="credit_history" {...register("credit_history")} />
            </Field>

            {/* Submit */}
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Applying..." : "Apply"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
