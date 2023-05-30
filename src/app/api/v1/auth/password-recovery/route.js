import supabase from "@/connections/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const baseUrl = req.nextUrl.origin;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/auth/password-reset`,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}
