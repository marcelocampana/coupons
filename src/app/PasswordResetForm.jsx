"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/app/components/FormInput";
import supabase from "@/connections/supabase";
import UtilsErrorAlert from "./components/UtilsErrorAlerts";
import UtilsSuccessAlert from "./components/UtilsSuccesAlert";

const PasswordResetForm = () => {
  const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  const handlePasswordRecovery = async (
    values,
    { setErrors, setSubmitting }
  ) => {
    const { password } = values;
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    console.log(error, data);

    if (error) {
      // setErrors({ password: "There was an error updating your password." });
      setDisplayErrorAlert(true);
    } else {
      // Show success message or perform any other actions

      setDisplaySuccessAlert(true);
      //console.log("Password updated successfully!");
    }

    setSubmitting(false);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session);
      if (event == "PASSWORD_RECOVERY") {
      }
    });
  }, []);
  return (
    <>
      {/*
          This example requires updating your template:

          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <Formik
        initialValues={{
          password: "",
          passwordRepeat: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required("Requerido")
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
          passwordRepeat: Yup.string()
            .required("Requerido")
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handlePasswordRecovery(values, { setSubmitting });
        }}
      >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Recuperación de contraseña
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-5">
              {displaySuccessAlert && (
                <UtilsSuccessAlert text="La contraseña se actualizó correctamente" />
              )}

              {displayErrorAlert && (
                <UtilsErrorAlert text="Error al actualizar la contraseña" />
              )}
            </div>
            <Form className="space-y-6">
              <Field
                as={Input}
                name="password"
                type="password"
                label="Ingresa una Nueva Contraseña"
              />
              <Field
                as={Input}
                name="passwordRepeat"
                type="password"
                label="Repite la Contraseña"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cambiar contraseña
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default PasswordResetForm;
