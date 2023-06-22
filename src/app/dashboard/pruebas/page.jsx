import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import Profiles from "@/services/Profiles";
import { BusinessAdmissionRequest } from "@/services";

const pagePrueba = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  // const getProfiles = async () => {
  //   const profileQuery = new Profiles(supabase);
  //   const profile = await profileQuery.getAllRecords();

  //   return profile;
  // };

  const getBusinessAdmissionRequests = async () => {
    const query = new BusinessAdmissionRequest(supabase);
    const result = await query.getAllRecords();

    return result;
  };

  console.log("gt", await getBusinessAdmissionRequests());

  return <div>Pruebas RLS</div>;
};

export default pagePrueba;
