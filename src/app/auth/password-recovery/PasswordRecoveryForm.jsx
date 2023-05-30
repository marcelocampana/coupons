"use client";

import { useState } from "react";
import { Auth } from "@/services/Auth";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormInput";
import UtilsSuccessAlert from "@/app/components/UtilsSuccesAlert";
import { classNames } from "@/helpers/classnames";

const PasswordRecoveryForm = () => {
  const [loading, setLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  const handlePasswordRecovery = async (values) => {
    const { email } = values;

    const apiAuth = new Auth();
    const auth = await apiAuth.passwordRecovery({ email });
    console.log(auth);
    setSendMessage(true);
    setLoading(false);
  };

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
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Requerido").email("Email inválido"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          setTimeout(() => {
            handlePasswordRecovery(values);
            setSubmitting(false);
          }, 400);
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
            <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {sendMessage && (
              <UtilsSuccessAlert text="Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña" />
            )}
            <Form className="space-y-6">
              <Field
                as={Input}
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                onFocus={() => setSendMessage(false)}
              />

              <div>
                <button
                  type="submit"
                  className={classNames(
                    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                    loading && "cursor-not-allowed opacity-50"
                  )}
                >
                  {loading ? "Enviando..." : "Recuperar contraseña"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default PasswordRecoveryForm;
