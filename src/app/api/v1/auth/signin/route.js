import { NextResponse } from "next/server";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const activeSession = await supabase.auth.getSession();

  try {
    if (activeSession.data.session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", activeSession.data.session.user.id);

      return NextResponse.json({ role: profile[0].role }, { status: 200 });
    } else {
      throw error;
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: error.status });
  }
}
