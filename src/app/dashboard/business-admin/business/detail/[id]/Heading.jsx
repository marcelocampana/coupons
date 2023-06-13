const Heading = ({ requestId }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Registro de comercio
        </h2>
        <div className="text-sm text-gray-600 mt-1">Estado: En revisión</div>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <a
          href={`/dashboard/business-admin/business/edit/${requestId}`}
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Editar
        </a>
      </div>
    </div>
  );
};

export default Heading;
