import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import BusinessAdmissionRequest from "@/services/BusinessAdmissionRequest";
import DetailRow from "./DetailRow";
import Subtitle from "@/app/components/UtilsSubtitle";
import Heading from "./Heading";

const BusinessDetail = async ({ req }) => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const dbQuery = new BusinessAdmissionRequest(supabase);
  const request = await dbQuery.getRecordById(req.params.id);

  const { request_status, business_admission_request_id, applicant_user_id } =
    request[0];

  const emptyDataLabel = "No hay datos";

  return (
    <div>
      <Heading requestId={req.params.id} />
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <DetailRow
            title="Nombre"
            value={request[0].business_display_name}
            span="1"
          />
          <DetailRow
            title="Email del comercio"
            value={request[0].business_email}
            span="1"
          />
          <DetailRow
            title="Razón social"
            value={request[0].business_legal_name}
            span="1"
          />
          <DetailRow title="Rut" value={request[0].business_rut} span="1" />
          <DetailRow
            title="Teléfono principal"
            value={request[0].business_main_phone}
            span="1"
          />
          <DetailRow
            title="Ubicación"
            value={`${request[0].business_address}, ${request[0].business_commune}, ${request[0].business_city}`}
            span="1"
          />
          <div
            className={`border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 hidden`}
          >
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Logo
            </dt>
            <dd className="mt-1 text-sm leading-6">
              <img
                className="h-20 w-20 rounded-full"
                src={request[0].business_logo_url}
                alt=""
              />
            </dd>
          </div>
          <div
            className={`border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 hidden`}
          >
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Cover
            </dt>
            <dd className="mt-1 text-sm leading-6">
              <div className="w-[800px] h-[300px] border-2 border-gray-100 mb-5 bg-gray-50">
                <img
                  className="object-contain w-full h-full"
                  src={request[0].business_cover_url}
                  alt="Cover image"
                />
              </div>
            </dd>
          </div>
          <DetailRow
            title="Descripción"
            value={
              request[0].business_description
                ? request[0].business_description
                : emptyDataLabel
            }
          />

          <Subtitle text="Representante legal" />
          <DetailRow
            title="Nombre"
            value={`${request[0].legal_representative_firstname} ${request[0].legal_representative_lastname}`}
            span="1"
          />
          <DetailRow
            title="Rut"
            value={request[0].legal_representative_rut}
            span="1"
          />
          <Subtitle text="Administrador del comercio" />
          <DetailRow
            title="Nombre"
            value={`${request[0].admin_contact_firstname} ${request[0].admin_contact_lastname}`}
            span="1"
          />
          <DetailRow
            title="Teléfono"
            value={request[0].admin_contact_phone}
            span="1"
          />
          <DetailRow
            title="Email"
            value={request[0].admin_contact_email}
            span="1"
          />
          <Subtitle text="Canales digitales" />
          <DetailRow
            title="Sitio web"
            value={
              request[0].business_website
                ? `https://${request[0].business_website}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Página de facebook"
            value={
              request[0].business_facebook
                ? `https://facebook.com/${request[0].business_facebook}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Instagram"
            value={
              request[0].business_instagram
                ? `https://instagram.com/${request[0].business_instagram}`
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
