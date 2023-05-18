import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import Heading from "@/app/components/AdminHeading";
import AddCoupon from "./AddCoupon";

const AddCouponPage = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data: activeSession } = await supabase.auth.getSession();

  if (!activeSession.session) {
    return redirect("/login");
  }
  return (
    <div>
      <Heading title="Nuevo Cupón" />
      <AddCoupon />
    </div>
  );
};

export default AddCouponPage;
