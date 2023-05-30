import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  try {
    const { data } = await supabase.auth.getUser();
    console.log(data);

    if (data.user === null) {
      return NextResponse.json(
        { error: "Unauthenticated user" },
        { status: 401 }
      );
    } else {
      const role = data.user.user_metadata.role;
      if (role === "business-admin") {
        const { data, error } = await supabase
          .from("business_admission_requests")
          .select("*");
        if (error) {
          return NextResponse.json({ error }, { status: error.code });
        } else {
          return NextResponse.json({ data }, { status: 200 });
        }
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
