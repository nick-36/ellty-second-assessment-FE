import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

interface DecodedToken {
  id: number;
  username: string;
  // username: string;
  // exp: number;
}

// export const getAuthUser = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     const decoded = jwtDecode<DecodedToken>(token);

//     // // Check if token is expired
//     // if (decoded.exp < Date.now() / 1000) {
//     //   localStorage.removeItem("token");
//     //   return null;
//     // }

//     return {
//       id: decoded.id,
//       username: decoded.username,
//     };
//   } catch (error) {
//     localStorage.removeItem("token");
//     return null;
//   }
// };

// export async function getAuthUser() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token");

//   if (!token) return null;

//   try {
//     const { payload } = await jwtVerify(
//       token.value,
//       new TextEncoder().encode(process.env.JWT_SECRET)
//     );

//     return payload;
//   } catch (error) {
//     return null;
//   }
// }
