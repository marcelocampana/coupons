//Business Admission Request status component

import classNames from "@/app/helpers/classnames";

const UtilsBARStatus = ({ status }) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium  ring-1 ring-inset",
        status === "En revisión"
          ? "bg-yellow-50 text-yellow-600 ring-yellow-600/20"
          : status === "Admitida"
          ? "bg-green-50 text-green-600 ring-green-600/20"
          : status
          ? "bg-gray-50 text-gray-600 ring-gray-600/20"
          : null
      )}
    >
      {status}
    </span>
  );
};

export default UtilsBARStatus;
