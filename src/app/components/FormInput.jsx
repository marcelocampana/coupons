"use client";

import { ErrorMessage } from "formik";

export default function Input(props) {
  return (
    <>
      <div>
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-2"
        >
          {props.label}
        </label>
        <input
          {...props}
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
        />
        <p className="mt-1.5 text-sm text-gray-500">{props.note}</p>
        <div className="text-red-500 mt-3 text-sm">
          <ErrorMessage name={props.name} />
        </div>
      </div>
    </>
  );
}
