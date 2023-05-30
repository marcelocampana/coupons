import supabase from "@/connections/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}
