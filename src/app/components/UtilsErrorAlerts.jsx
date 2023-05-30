import { XCircleIcon } from "@heroicons/react/20/solid";

const UtilsErrorAlert = ({ text }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{text}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5"></div>
        </div>
      </div>
    </div>
  );
};

export default UtilsErrorAlert;
