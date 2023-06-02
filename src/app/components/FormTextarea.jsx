import { ErrorMessage } from "formik";

export default function Textarea(props) {
  return (
    <div>
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-2"
      >
        {props.label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <textarea
          {...props}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="mt-2 text-sm text-gray-500">{props.note}</p>
        <div className="text-red-500 mt-1 text-sm">
          <ErrorMessage name={props.name} />
        </div>
      </div>
    </div>
  );
}
