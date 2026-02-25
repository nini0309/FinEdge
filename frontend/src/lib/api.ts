export async function api(
  path: string,
  options: RequestInit = {}
) {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookie = cookieStore.get("access_token");

    return fetch(`http://localhost:8000/api/v1${path}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: "access_token=" + cookie?.value || "",
        ...(options.headers || {}),
      },
      cache: "no-store",
      ...options,
    });
  }

  return fetch(`http://localhost:8000/api/v1${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });
}
