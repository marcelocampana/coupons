import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import DetailRows from "./DetailRows";
import Subtitle from "./Subtitle";
import UpdateRequestStatus from "./UpdateRequestStatus";

const BusinessDetail = async ({ req }) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: currentUser } = await supabase.auth.getUser();

  const { data: request } = await supabase
    .from("business_admission_requests")
    .select("*")
    .eq("business_admission_request_id", req.params.id);

  const { request_status, business_admission_request_id, applicant_user_id } =
    request[0];

  return (
    <div>
      <UpdateRequestStatus
        requestId={business_admission_request_id}
        requestStatus={request_status}
        userId={currentUser.user.id}
        applicantUserId={applicant_user_id}
      />
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <DetailRows
            title="Nombre"
            value={request[0].business_display_name}
            span="1"
          />
          <DetailRows
            title="Email del comercio"
            value={request[0].business_email}
            span="1"
          />
          <DetailRows
            title="Razón social"
            value={request[0].business_legal_name}
            span="1"
          />
          <DetailRows title="Rut" value={request[0].business_rut} span="1" />
          <DetailRows
            title="Teléfono principal"
            value={request[0].business_main_phone}
            span="1"
          />
          <DetailRows
            title="Ubicación"
            value={`${request[0].business_address}, ${request[0].business_commune}, ${request[0].business_city}`}
            span="1"
          />
          <Subtitle text="Representante legal" />
          <DetailRows
            title="Nombre"
            value={`${request[0].legal_representative_firstname} ${request[0].legal_representative_lastname}`}
            span="1"
          />
          <DetailRows
            title="Rut"
            value={request[0].legal_representative_rut}
            span="1"
          />
          <Subtitle text="Administrador del comercio" />
          <DetailRows
            title="Nombre"
            value={`${request[0].admin_contact_firstname} ${request[0].admin_contact_lastname}`}
            span="1"
          />
          <DetailRows
            title="Teléfono"
            value={request[0].admin_contact_phone}
            span="1"
          />
          <DetailRows
            title="Email"
            value={request[0].admin_contact_email}
            span="1"
          />
        </dl>
      </div>
    </div>
  );
};

export default BusinessDetail;
