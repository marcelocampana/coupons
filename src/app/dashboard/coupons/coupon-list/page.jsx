import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminHeading from "@/app/components/AdminHeading";
import CouponsList from "./CouponList";

const CouponsPage = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data: activeSession } = await supabase.auth.getSession();

  if (!activeSession.session) {
    return redirect("/login");
  }
  return (
    <>
      <AdminHeading title="Cupones" />
      <CouponsList />
    </>
  );
};

export default CouponsPage;
