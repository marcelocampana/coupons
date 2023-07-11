export default function UtilsDivider({ title, description }) {
  return (
    <div className="pb-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-start mb-1">
          <span className="bg-white pr-3 text-md font-medium text-gray-800">
            {title}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-400">{description}</div>
    </div>
  );
}
