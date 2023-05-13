import { ErrorMessage } from "formik";

export default function Checkbox(props) {
  return (
    <>
      <div className="pt-8 my-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {props.label}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{props.prompt}</p>
        </div>
        <div className="mt-6">
          <div className="mt-0 space-y-4">
            {props.options.map((option, i) => (
              <div key={i} className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    {...props}
                    id={option.id}
                    name={props.name}
                    value={option.value}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={option.name}
                    className="font-medium text-gray-700"
                  >
                    {option.label}
                  </label>
                  <p className="text-gray-500">{option.prompt}</p>
                </div>
              </div>
            ))}
            <div className="text-red-500 mt-1 text-sm">
              <ErrorMessage name={props.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
