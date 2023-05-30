import supabase from "@/connections/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, firstname, lastname, phone, role, terms } =
    await req.json();

  const { data: profile } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email);

  if (profile.length > 0) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstname,
        lastname,
        email,
        role: role === "business-admin" ? role : "end-user",
        phone,
        terms,
      },
    },
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}
