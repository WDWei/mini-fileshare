import { createUser } from "@/actions/actions";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

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
    console.log(formData);
    bcrypt.hash(formData.get("password"), 10, async (err, hashedPassword) => {
      // if err, do something
      formData.set("password", hashedPassword);
      await createUser(formData);
    });
    return NextResponse.json(
      { text: "yes" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get admins" },
      {
        status: 500,
      }
    );
  }
}
