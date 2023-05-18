import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

const CouponList = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data: activeSession } = await supabase.auth.getSession();

  if (!activeSession.session) {
    return redirect("/login");
  }
  return <div>CouponList</div>;
};

export default CouponList;
