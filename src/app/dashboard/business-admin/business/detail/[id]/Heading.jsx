import UtilsBARStatus from "@/app/components/UtilsBARStatus";
import { formatDateHour } from "@/helpers/formatDateHours";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

const Heading = ({ businessAdmissionRequest }) => {
  const { request_status, business_admission_request_id, created_at } =
    businessAdmissionRequest;

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Solicitud de Registro de Comercio{" "}
          </h2>
          <div className="mt-1.5 ml-1">
            <UtilsBARStatus status={request_status} />
          </div>
        </div>
        <div className="flex">
          <RocketLaunchIcon className="text-gray-400 w-4 h-4 mt-1.5 mr-1" />
          <p className="text-gray-500 text-sm mt-1">
            Creada el {formatDateHour(created_at)}
          </p>
        </div>
      </div>
      {request_status !== "Admitida" && (
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <a
            href={`/dashboard/business-admin/business/edit/${business_admission_request_id}`}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar
          </a>
        </div>
      )}
    </div>
  );
};

export default Heading;
