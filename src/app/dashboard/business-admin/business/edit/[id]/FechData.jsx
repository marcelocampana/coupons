import { BusinessAdmissionRequest } from "@/services";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import UpdateForm from "./UpdateForm";
import Forbidden from "@/app/components/AdminForbidden";

const FechData = async ({ req }) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const businessAdmissionRequestsData = await dbQuery.getRecordById(
    req.params.id
  );

  console.log(businessAdmissionRequestsData[0].request_status);
  return (
    <>
      {businessAdmissionRequestsData[0].request_status === "Admitida" ? (
        <Forbidden />
      ) : (
        <UpdateForm
          businessAdmissionRequestsData={businessAdmissionRequestsData}
        />
      )}
    </>
  );
};

export default FechData;
