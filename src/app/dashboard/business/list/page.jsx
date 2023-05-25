import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export const revalidate = 0;

const CouponsList = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data: businessAdmissionRequests, error } = await supabase
    .from("business_admission_requests")
    .select("*");
  console.log(businessAdmissionRequests, error);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Solicitudes de Publicación de Comercios
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Desde aquí puedes revisar y aceptar las solicitudes de ingreso de
              comercios.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Nombre
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Razón social
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  RUT
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Fecha de registro
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Estado de solicitud
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {businessAdmissionRequests.map((request, i) => (
                <tr key={i}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {request.business_display_name}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {request.business_legal_name}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {request.business_rut}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleDateString("es-CL")}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {request.request_status}
                  </td>
                  <td className="relative py-4 pl-3 text-right text-sm font-medium">
                    <a
                      href={`/dashboard/business/detail/${request.business_admission_request_id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {request.admission_is_approved ? "Ver" : "Revisar"}
                      <span className="sr-only">
                        , {request.business_admission_request_id}
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponsList;
