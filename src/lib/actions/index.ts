import { cookies } from "next/headers";

export async function getTrees() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL_PROD}/trees`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch trees");

  return res.json();
}
