import { ErrorMessage } from "formik";

export default function Select(props) {
  return (
    <div>
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-1"
      >
        {props.label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <select
          {...props}
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          <option value="">Selecciona una opción</option>
          {props.values.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="text-red-500 mt-1 text-sm">
        <ErrorMessage name={props.name} />
      </div>
    </div>
  );
}
