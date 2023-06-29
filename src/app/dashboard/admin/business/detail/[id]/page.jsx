import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import BusinessAdmissionRequest from "@/services/BusinessAdmissionRequest";
import { redirect } from "next/navigation";
import ServerAuth from "@/services/ServerAuth";
import UtilsLogoCover from "@/app/components/UtilsLogoCover";
import UtilsBARDetail from "@/app/components/UtilsBARDetail";
import Heading from "./Heading";

const BusinessDetailPage = async (req) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const businessAdmissionRequest = await dbQuery.getRecordById(req.params.id);

  const {
    business_admission_request_id,
    applicant_user_id,
    business_logo_url,
    business_cover_url,
    request_status,
    created_at,
    admin_updated_at,
    business_admin_updated_at,
    request_viewer,
  } = businessAdmissionRequest[0];

  const serverAuth = new ServerAuth();
  const currentUser = await serverAuth.getCurrentUser();

  if (currentUser.user === null) {
    redirect("/signin");
  } else {
    console.log("currentUser", currentUser.user.user_metadata.role);
  }

  return (
    <>
      <Heading
        requestId={business_admission_request_id}
        applicantUserId={applicant_user_id}
        status={request_status}
        createdAt={created_at}
        adminUpdatedAt={admin_updated_at}
        businessAdminUpdatedAt={business_admin_updated_at}
        requestViewer={request_viewer}
        currentAdminId={currentUser.user.id}
      />
      <UtilsLogoCover logo={business_logo_url} cover={business_cover_url} />
      <UtilsBARDetail businessAdmissionRequest={businessAdmissionRequest[0]} />
    </>
  );
};

export default BusinessDetailPage;
