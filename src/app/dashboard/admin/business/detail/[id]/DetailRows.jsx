const DetailRows = ({ title, value, span }) => {
  return (
    <div
      className={`border-t border-gray-100 px-4 py-6 sm:col-span-${span} sm:px-0`}
    >
      <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{value}</dd>
    </div>
  );
};

export default DetailRows;
