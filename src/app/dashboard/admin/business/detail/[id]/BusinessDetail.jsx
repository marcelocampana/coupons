import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import BusinessAdmissionRequest from "@/services/BusinessAdmissionRequest";
import ServerAuth from "@/services/ServerAuth";
import DetailRows from "./DetailRows";
import Subtitle from "./Subtitle";
import Header from "./Header";
import ImageHeader from "./ImageHeader";

const BusinessDetail = async ({ req }) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const serverAuth = new ServerAuth();
  const currentUser = await serverAuth.getCurrentUser();

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const request = await dbQuery.getRecordById(req.params.id);

  const {
    request_status,
    business_admission_request_id,
    applicant_user_id,
    created_at,
    updated_at,
    admin_updated_at,
    business_admin_updated_at,
    request_viewer,
  } = request[0];

  const emptyDataLabel = "No hay datos";

  return (
    <div>
      <Header
        requestId={business_admission_request_id}
        requestStatus={request_status}
        adminId={currentUser.user.id}
        applicantUserId={applicant_user_id}
        requestViewer={request_viewer}
        createdAt={created_at}
        updatedAt={updated_at}
        adminUpdatedAt={admin_updated_at}
        businessAdminUpdatedAt={business_admin_updated_at}
      />

      <ImageHeader
        cover={request[0].business_cover_url}
        logo={request[0].business_logo_url}
      />
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <DetailRows
            title="Nombre del comercio"
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
            title="Teléfono secundario"
            value={
              request[0].business_secondary_phone
                ? request[0].business_secondary_phone
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRows
            title="Ubicación"
            value={`${request[0].business_address}, ${request[0].business_commune}, ${request[0].business_city}`}
            span="2"
          />

          <DetailRows
            title="Descripción"
            value={
              request[0].business_description
                ? request[0].business_description
                : emptyDataLabel
            }
            span="2"
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
          <Subtitle text="Canales digitales" />
          <DetailRows
            title="Sitio web"
            value={
              request[0].business_website
                ? `https://${request[0].business_website}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRows
            title="Página de facebook"
            value={
              request[0].business_facebook
                ? `https://facebook.com/${request[0].business_facebook}`
                : emptyDataLabel
            }
            span="1"
          />

          <DetailRows
            title="Instagram"
            value={
              request[0].business_instagram
                ? `https://instagram.com/${request[0].business_instagram}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRows
            title="Whatsapp"
            value={
              request[0].business_whatsapp
                ? `https://whatsapp.com/${request[0].business_whatsapp}`
                : emptyDataLabel
            }
            span="1"
          />
        </dl>
      </div>
    </div>
  );
};

export default BusinessDetail;