"use client";

import { useEffect, useState } from "react";
import { Auth } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormInput";
import supabase from "@/connections/supabase";

const PasswordResetForm = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const handlePasswordRecovery = async (values) => {
    const { password } = values;
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    console.log(data, error);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setDisplayForm(true);
      }
    });
  }, [displayForm]);
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
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(() => {
            handlePasswordRecovery(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {displayForm && (
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

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form className="space-y-6">
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  label="Ingresa una nueva Contraseña"
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
        )}
      </Formik>
    </>
  );
};

export default PasswordResetForm;
