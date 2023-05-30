import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const id = request.nextUrl.pathname.split("/")[5];

  try {
    const { data } = await supabase.auth.getUser();
    if (data) {
      const role = data.user.user_metadata.role;

      if (data.user === null || role !== "business-admin") {
        return NextResponse.json(
          { error: "Unauthenticated user" },
          { status: 401 }
        );
      } else {
        const { data, error } = await supabase
          .from("business_admission_requests")
          .select("*")
          .eq("business_admission_request_id", id);
        if (error) {
          return NextResponse.json({ error }, { status: error.code });
        } else {
          return NextResponse.json({ data }, { status: 200 });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
