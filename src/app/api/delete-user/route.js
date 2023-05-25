import { NextResponse } from "next/server";
import supabase from "@/services/supabaseAdmin";

export async function POST(req) {
  const { userId } = await req.json();

  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    return NextResponse.json({ success: false, error });
  } else {
    return NextResponse.json({ success: true });
  }
}
