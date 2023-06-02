const FormLogo = () => {
  return (
    <div className="col-span-full">
      <label
        htmlFor="photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <UserCircleIcon
          className="h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default FormLogo;
