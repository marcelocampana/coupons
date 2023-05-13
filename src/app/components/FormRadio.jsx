import { ErrorMessage } from "formik";

export default function Radio(props) {
  return (
    <div className="sm:col-span-2">
      <div className="max-w-lg">
        <p className="text-sm text-gray-500 sm:pt-2">{props.label}</p>

        <fieldset>
          <div className="mt-4 space-y-4">
            {props.options.map((option, i) => (
              <div key={i} className="flex items-center" {...props}>
                <input
                  id={option.id}
                  name={props.name}
                  value={option.value}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={option.id}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="text-red-500 mt-1 text-sm">
            <ErrorMessage name={props.name} />
          </div>
        </fieldset>
      </div>
    </div>
  );
}
