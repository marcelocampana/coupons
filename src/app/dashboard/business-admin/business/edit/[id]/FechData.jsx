import { BusinessAdmissionRequest } from "@/services";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import UpdateForm from "./UpdateForm";

const FechData = async ({ req }) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  console.log(req.params.id);

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const businessAdmissionRequestsData = await dbQuery.getRecordById(
    req.params.id
  );

  return (
    <UpdateForm businessAdmissionRequestsData={businessAdmissionRequestsData} />
  );
};

export default FechData;
