import { signIn } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405,
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.formData();
    await signIn("credentials", formData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get admins" },
      {
        status: 500,
      }
    );
  }
}
