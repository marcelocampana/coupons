import UtilsBARStatus from "@/app/components/UtilsBARStatus";
import { formatDateHour } from "@/helpers/formatDateHours";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Heading = ({ businessAdmissionRequest }) => {
  const { request_status, business_admission_request_id, created_at } =
    businessAdmissionRequest;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="sm:flex md:items-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Mi Solicitud de Registro de Comercio
          <span className="ml-1 sm:flex md:items-center mt-1.5">
            <UtilsBARStatus status={request_status} />
          </span>
        </h2>
        <p>Completa tu solicitud haciendo click en el botón "Editar"</p>

        <div className="flex mt-1">
          <RocketLaunchIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
          <p className="text-gray-500 text-sm mt-1">
            Solicitud creada el {formatDateHour(created_at)}
          </p>
        </div>
      </div>
      {request_status !== "Admitida" && (
        <div className="mt-6 sm:mt-4 flex sm:ml-4 ">
          <Link
            href={`/dashboard/business-admin/business/edit/${business_admission_request_id}`}
            className="md:ml-3 inline-flex items-center rounded-md bg-custom-fuchsia-07e px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-fuchsia-07e"
          >
            Editar
          </Link>
        </div>
      )}
    </div>
  );
};

export default Heading;
