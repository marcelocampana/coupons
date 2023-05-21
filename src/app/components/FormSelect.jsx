import { ErrorMessage } from "formik";

export default function Select(props) {
  const { value, options, ...rest } = props;
  return (
    <div>
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-1"
      >
        {rest.label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <select
          {...rest}
          value={value}
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          <option value="">Selecciona una opción</option>
          {props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-sm text-gray-500">{props.note}</p>
      <div className="text-red-500 mt-1 text-sm">
        <ErrorMessage name={props.name} />
      </div>
    </div>
  );
}
