"use client";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Personal Schema
const PersonalSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  phone: z.string().min(1, { error: "Contact is required." }),
  address: z.string().min(1, { error: "Address is required." }),
  age: z.coerce.number<number>().min(18),
  maritalStatus: z.boolean(),
  urbanRural: z.string(),
  gender: z.string(),
});

const IdentitySchema = z.object({
  aadhar: z.string().min(1, { error: "Aadhar is required." }),
  pan: z.string().min(1, { error: "Pan is required." }),
});

const IncomeSchema = z.object({
  dependents: z.coerce.number<number>(),
  selfEmployed: z.boolean(),
  graduate: z.boolean(),
});

// Combining Schemas under single Schema for our form
const profileSchema = PersonalSchema.extend(IdentitySchema.shape).extend(
  IncomeSchema.shape,
);

export type ProfileFormValues = z.infer<typeof profileSchema>;

type Props = {
  mode?: "create" | "edit";
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function MultiForm({ mode, initialData, onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { name: "personal", schema: PersonalSchema },
    { name: "identity", schema: IdentitySchema },
    { name: "income", schema: IncomeSchema },
  ] as const;

  const currentStep = steps[activeStep].name;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    const payload = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      age: data.age,
      aadhar: data.aadhar,
      pan: data.pan,
      gender: data.gender,
      self_employed: data.selfEmployed,
      graduate: data.graduate,
      marital_status: data.maritalStatus,
      no_of_dependents: data.dependents,
      property_area: data.urbanRural,
    };

    try {
      const response = await api("/user_details", {
        method: mode === "edit" ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
        });

        throw new Error(errorData?.detail || "Something went wrong");
      }

      toast.success(
        mode === "edit"
          ? "Profile updated successfully"
          : "Profile created successfully",
      );
      onSuccess?.();
    } catch (error: any) {
      console.error("Request failed:", error);
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full sm:max-w-md my-10 mx-auto">
      <CardHeader>
        <CardTitle>{mode === "edit" ? "Edit Profile" : "Complete Profile"} </CardTitle>
        <CardDescription>
          Enter your details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="profile-form"
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
            <Activity mode={currentStep === "personal" ? "visible" : "hidden"}>
              {/* Personal */}
              <h2 className="text-md font-medium">Personal Detail</h2>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input {...field} placeholder="e.g. John Doe" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input {...field} placeholder="e.g. 0123456789" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input {...field} placeholder="e.g. Melbourne, Australia" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="age">Age</FieldLabel>
                    <Input {...field} placeholder="e.g. 8" type="number" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="maritalStatus"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="maritalStatus">
                      Are you married?
                    </FieldLabel>
                    <Switch
                      id="maritalStatus"
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
              <Controller
                name="urbanRural"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="urbanRural">
                      Where do you live?
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="urbanRural"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                        <SelectItem value="Semiurban">Semiurban</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Activity>

            {/* Identity */}

            <Activity mode={currentStep === "identity" ? "visible" : "hidden"}>
              <h2 className="text-md font-medium">Verify Identity</h2>
              <Controller
                name="aadhar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="aadhar">Aadhar</FieldLabel>
                    <Input {...field} placeholder="Your aadhar" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="pan"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="pan">Pan</FieldLabel>
                    <Input {...field} placeholder="Your pan" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Checkbox id="terms-checkbox" name="terms-checkbox" required />
                <Label htmlFor="terms-checkbox">Verify details</Label>
              </Field>
            </Activity>

            <Activity mode={currentStep === "income" ? "visible" : "hidden"}>
              {/* Income */}
              <h2 className="text-md font-medium">Employment Details</h2>

              <Controller
                name="dependents"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="dependents">Dependents</FieldLabel>
                    <Input {...field} placeholder="e.g. 4" type="number" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="selfEmployed"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="selfEmployed">
                      Are you self employed?
                    </FieldLabel>
                    <Switch
                      id="selfEmployed"
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
              <Controller
                name="graduate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="graduate">
                      Are you graduate?
                    </FieldLabel>
                    <Switch
                      id="graduate"
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
            </Activity>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation={"horizontal"}>
          {activeStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveStep((i) => i - 1)}
            >
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 && (
            <Button
              type="button"
              onClick={async () => {
                const valid = await form.trigger();
                if (valid) {
                  setActiveStep((i) => i + 1);
                }
              }}
            >
              Next
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Button type="submit" form="profile-form" disabled={loading}>
              Submit
            </Button>
          )}
          {mode === "edit" && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Field>

        <Toaster />
      </CardFooter>
    </Card>
  );
}
