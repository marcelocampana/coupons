import { NextResponse } from "next/server";
import supabase from "@/connections/supabase-admin";

export async function POST(req) {
  const { userId } = await req.json();

  await supabase.from("profiles").delete().eq("id", userId);
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json({ success: false, error });
  } else {
    return NextResponse.json({ success: true });
  }
}
