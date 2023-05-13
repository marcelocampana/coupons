export default function UtilsDivider({ title }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-start mt-12 mb-6">
        <span className="bg-white pr-3 text-md font-medium text-gray-800">
          {title}
        </span>
      </div>
    </div>
  );
}
