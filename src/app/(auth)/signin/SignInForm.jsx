"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../supabase-provider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import ClientAuth from "@/services/ClientAuth";
import UtilsErrorAlert from "../../components/UtilsErrorAlerts";
import Input from "../../components/FormInput";
import Link from "next/link";
import classNames from "@/app/helpers/classnames";

const SignInForm = () => {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(values) {
    const { email, password } = values;

    try {
      const clientAuth = new ClientAuth();
      const { user } = await clientAuth.signInWithPassword(
        email,
        password,
        supabase
      );

      if (user) {
        if (user.user_metadata.role === "business-admin") {
          router.push("/dashboard/business-admin/business/home");
        } else if (user.user_metadata.role === "admin") {
          router.push("/dashboard/admin/business/list");
        } else router.push("/");
      }
    } catch (error) {
      error.message === "Invalid login credentials";
      setErrorMessage("Email o contraseña inválidos");
      setLoading(false);
    }
  }

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
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Requerido").email("Email inválido"),
          password: Yup.string()
            .required("Requerido")
            .min(6, "La contraseña debe tener al menos 8 caracteres"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          setTimeout(() => {
            handleSignIn(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.png"
              alt="Logo Chicupón"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Accede a Chicupón
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorMessage && <UtilsErrorAlert text={errorMessage} />}
            <Form>
              <div className="mb-4">
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  onFocus={() => setErrorMessage(false)}
                />

                <Field
                  as={Input}
                  name="password"
                  type="password"
                  label="Contraseña"
                  autoComplete="current-password"
                  onFocus={() => setErrorMessage(false)}
                />
              </div>
              <div>
                <div className="text-sm leading-6 mb-3 text-right">
                  <Link
                    href="/password-recovery"
                    className="font-semibold text-gray-600 hover:text-gray-800"
                  >
                    ¿Olvidaste la contraseña?
                  </Link>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className={classNames(
                    "flex w-full justify-center rounded-md bg-custom-fuchsia-07e px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-fuchsia-07e",
                    loading && "cursor-not-allowed opacity-50"
                  )}
                >
                  {loading ? "Iniciado sesión..." : "Acceder"}
                </button>
              </div>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500 hidden">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default SignInForm;
