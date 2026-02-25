import { LoginForm } from "@/components/forms/login-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  // const cookieStore = await cookies()
  // const token = cookieStore.get("access_token")

  // if (token) {
  //   redirect("/dashboard")   // redirect if already logged in
  // }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
