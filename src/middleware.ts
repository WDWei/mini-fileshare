export { auth as middleware } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/redirect")) {
//     return NextResponse.rewrite(new URL("/", request.url));
//   }
//   const currentUser = request.cookies.get("currentUser")?.value;
//   return;
// }

// export const config = {
//   matcher: "",
// };
