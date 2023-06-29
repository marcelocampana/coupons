import { redirect } from "next/navigation";
import ServerAuth from "@/services/ServerAuth";
import Head from "next/head";
import Heading from "./Heading";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import BusinessAdmissionRequest from "@/services/BusinessAdmissionRequest";
import UtilsLogoCover from "@/app/components/UtilsLogoCover";
import UtilsBARDetail from "../../../../../components/UtilsBARDetail";

const BusinessDetailPage = async (req) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const businessAdmissionRequest = await dbQuery.getRecordById(req.params.id);

  const { business_logo_url, business_cover_url } = businessAdmissionRequest[0];

  const serverAuth = new ServerAuth();
  const currentUser = await serverAuth.getCurrentUser();

  if (currentUser.user === null) {
    redirect("/signin");
  } else {
    console.log("currentUser", currentUser.user.user_metadata.role);
  }
  return (
    <>
      <Heading businessAdmissionRequest={businessAdmissionRequest[0]} />
      <UtilsLogoCover logo={business_logo_url} cover={business_cover_url} />
      <UtilsBARDetail businessAdmissionRequest={businessAdmissionRequest[0]} />
    </>
  );
};

export default BusinessDetailPage;
