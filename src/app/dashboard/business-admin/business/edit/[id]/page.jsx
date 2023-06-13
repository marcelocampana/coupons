import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import FechData from "./FechData";
import Forbidden from "@/app/components/AdminForbidden";

const RequestAdmissionEdit = async (req) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: currentUser } = await supabase.auth.getUser();

  if (currentUser.user === null) {
    redirect("/auth/signin");
  } else if (currentUser.user.user_metadata.role === "business-admin") {
    return <FechData req={req} />;
  } else {
    return <Forbidden />;
  }
};

export default RequestAdmissionEdit;
