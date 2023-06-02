"use client";

import { ErrorMessage } from "formik";

export default function InputAddon(props) {
  return (
    <>
      <div>
        <label
          htmlFor={props.name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {props.label}
        </label>
        <div className="mt-[9px] flex rounded-md ">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            {props.addon}
          </span>
          <input
            {...props}
            type="text"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 h-[38px] text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">{props.note}</p>
        <div className="text-red-500 mt-1 text-sm">
          <ErrorMessage name={props.name} />
        </div>
      </div>
    </>
  );
}
