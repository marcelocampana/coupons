import DetailRow from "@/app/components/UtilsDetailRow";
import Subtitle from "@/app/components/UtilsSubtitle";

const UtilsBARDetail = async ({ businessAdmissionRequest }) => {
  const {
    business_display_name,
    business_email,
    business_legal_name,
    business_rut,
    business_main_phone,
    business_secondary_phone,
    business_address,
    business_commune,
    business_city,
    business_logo_url,
    business_cover_url,
    business_description,
    legal_representative_firstname,
    legal_representative_lastname,
    legal_representative_rut,
    admin_contact_firstname,
    admin_contact_lastname,
    admin_contact_email,
    admin_contact_phone,
    business_website,
    business_facebook,
    business_instagram,
    business_whatsapp,
  } = businessAdmissionRequest;

  const emptyDataLabel = "No hay datos";

  return (
    <div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <DetailRow
            title="Nombre del comercio"
            value={business_display_name}
            span="1"
          />
          <DetailRow
            title="Email del comercio"
            value={business_email}
            span="1"
          />
          <DetailRow
            title="Razón social"
            value={business_legal_name}
            span="1"
          />
          <DetailRow title="RUT" value={business_rut} span="1" />
          <DetailRow
            title="Teléfono principal"
            value={business_main_phone}
            span="1"
          />
          <DetailRow
            title="Teléfono secundario"
            value={
              business_secondary_phone
                ? `+56 ${business_secondary_phone}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Ubicación"
            value={`${business_address}, ${business_commune}, ${business_city}`}
            span="2"
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
                src={business_logo_url}
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
                  src={business_cover_url}
                  alt="Cover image"
                />
              </div>
            </dd>
          </div>
          <DetailRow
            title="Descripción"
            value={business_description ? business_description : emptyDataLabel}
            span="2"
          />

          <Subtitle text="Representante legal" />
          <DetailRow
            title="Nombre"
            value={`${legal_representative_firstname} ${legal_representative_lastname}`}
            span="1"
          />
          <DetailRow title="Rut" value={legal_representative_rut} span="1" />
          <Subtitle text="Administrador del comercio" />
          <DetailRow
            title="Nombre"
            value={`${admin_contact_firstname} ${admin_contact_lastname}`}
            span="1"
          />
          <DetailRow title="Teléfono" value={admin_contact_phone} span="1" />
          <DetailRow title="Email" value={admin_contact_email} span="1" />
          <Subtitle text="Canales digitales" />
          <DetailRow
            title="Sitio web"
            value={
              business_website ? `https://${business_website}` : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Página de facebook"
            value={
              business_facebook
                ? `https://facebook.com/${business_facebook}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Instagram"
            value={
              business_instagram
                ? `https://instagram.com/${business_instagram}`
                : emptyDataLabel
            }
            span="1"
          />
          <DetailRow
            title="Whatsapp"
            value={
              business_whatsapp ? `+56 ${business_whatsapp}` : emptyDataLabel
            }
            span="1"
          />
        </dl>
      </div>
    </div>
  );
};

export default UtilsBARDetail;
