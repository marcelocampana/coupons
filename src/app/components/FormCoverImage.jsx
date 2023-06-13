import { PhotoIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "formik";
import { useState } from "react";

const InputImage = ({ label, note, name, setFieldValue, imageSize, dbUrl }) => {
  const [fileValues, setFileValues] = useState("");

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setFileValues(file);
    setFieldValue(name, file, true);
  };
  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <p className="text-sm text-gray-500">{note}</p>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mb-8">
        <div className="text-center">
          {fileValues &&
            (fileValues.type === "image/png" ||
              fileValues.type === "image/jpeg") && (
              <img
                src={URL.createObjectURL(fileValues)}
                alt="imagen"
                className={`${imageSize} object-cover mx-auto`}
              />
            )}
          {!fileValues && dbUrl && (
            <img
              src={dbUrl}
              alt="imagen"
              className={`${imageSize} object-cover mx-auto`}
            />
          )}
          {!fileValues && !dbUrl && (
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}

          {fileValues && fileValues.size > 500000 && (
            <p className="text-xs leading-5 text-red-500">
              El archivo no debe pesar más de 500 KB
            </p>
          )}
          {fileValues &&
            fileValues.type !== "image/png" &&
            fileValues.type !== "image/jpeg" && (
              <p className="text-xs leading-5 text-red-500">
                La extensión debe ser JPG, JPEG o PNG.
              </p>
            )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <span> Elige una imagen </span>
              <input
                name={name}
                id={name}
                type="file"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            <p className="pl-1 hidden">o arrastrala aquí</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            JPG, JPEG o PNG de hasta 500 KB
          </p>
        </div>
      </div>
      <div className="text-red-500 mt-3 text-sm">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default InputImage;
