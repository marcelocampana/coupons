"use client";

import { useState } from "react";
import { useSupabase } from "../../supabase-provider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  FormButton,
  Input,
  Select,
  UtilsDivider,
  GridForm,
  WebHeading,
  WebWidth,
  InputPhone,
} from "@/app/components";
import { ClientAuth, BusinessAdmissionRequest } from "@/services";
import classNames from "@/helpers/classnames";

const Button = (props) => {
  return (
    <div className="text-right">
      <button
        {...props}
        type="button"
        className={classNames(
          "rounded py-2 px-4 text-sm font-semibold text-white bg-gray-400 hover:bg-pink-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-purple-282 mt-5",
          props.label === "Continuar" ? "bg-gray-500" : "bg-gray-400"
        )}
      >
        {props.label}
      </button>
    </div>
  );
};

const NewBusiness = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formStart, setFormStart] = useState(true);
  const [formMiddle, setFormMiddle] = useState(false);
  const [formEnd, setFormEnd] = useState(false);

  const formStep = (target) => {
    if (target === "middle") {
      setFormStart(false);
      setFormMiddle(true);
      setFormEnd(false);
    } else if (target === "end") {
      setFormStart(false);
      setFormMiddle(false);
      setFormEnd(true);
    } else if (target === "start") {
      setFormStart(true);
      setFormMiddle(false);
      setFormEnd(false);
    }
  };

  const checkIfValueExistsInDatabase = async (
    valueToValidate,
    tableToValidate,
    columnToValidate
  ) => {
    const { data } = await supabase
      .from(tableToValidate)
      .select(columnToValidate)
      .eq(columnToValidate, valueToValidate);
    return data.length > 0;
  };

  const handleInsert = async (dataInsert) => {
    const {
      admin_contact_email: email,
      admin_contact_password: password,
      admin_contact_firstname: firstname,
      admin_contact_lastname: lastname,
      admin_contact_phone: phone,
    } = dataInsert;
    const role = "business-admin";
    const terms = "Si";

    const clientAuth = new ClientAuth();
    const signUpResult = await clientAuth.signUp(
      firstname,
      lastname,
      email,
      password,
      phone,
      role,
      terms,
      supabase
    );

    if (Object.keys(signUpResult.user).length !== 0) {
      const { id: userId } = signUpResult.user;
      const {
        admin_contact_password,
        admin_contact_confirm_password,
        ...insertData
      } = dataInsert;

      try {
        const dbQuery = new BusinessAdmissionRequest(supabase);

        const data = await dbQuery.insertRecord({
          applicant_user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
          admin_updated_at: new Date(),
          business_admin_updated_at: new Date(),
          ...insertData,
        });

        if (data) {
          router.push("/success-business-record");
        } else {
          throw new Error("Error al insertar el registro del comercio.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const initialValues = {
    business_display_name: "",
    business_email: "",
    business_main_phone: "",
    business_address: "",
    business_commune: "",
    business_city: "",
    business_legal_name: "",
    business_rut: "",
    legal_representative_firstname: "",
    legal_representative_lastname: "",
    legal_representative_rut: "",
    admin_contact_firstname: "",
    admin_contact_lastname: "",
    admin_contact_email: "",
    admin_contact_phone: "",
    admin_contact_password: "",
    admin_contact_confirm_password: "",
  };

  const validationSchema = Yup.object({
    business_display_name: Yup.string().required("Requerido"),
    business_email: Yup.string()
      .required("Requerido")
      .email("Email inválido")
      .test(
        "email-exists",
        "Este email ya está registrado",
        async (value) =>
          !(await checkIfValueExistsInDatabase(
            value,
            "businesses",
            "business_email"
          ))
      )
      .test(
        "email-exists",
        "Este email ya tiene una solicitud en curso",
        async (value) =>
          !(await checkIfValueExistsInDatabase(
            value,
            "business_admission_requests",
            "business_email"
          ))
      ),
    business_main_phone: Yup.number()
      .typeError("Debe incluir solo números")
      .min(100000000, "Debe incluir al menos 9 dígitos")
      .required("Requerido"),
    business_address: Yup.string().required("Requerido"),
    business_commune: Yup.string().required("Requerido"),
    business_city: Yup.string().required("Requerido"),
    business_legal_name: Yup.string().required("Requerido"),
    business_rut: Yup.string()
      .required("Requerido")
      .matches(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/, "Rut inválido")
      .test(
        "rut-exists",
        "Este Rut ya está registrado",
        async (value) =>
          !(await checkIfValueExistsInDatabase(
            value,
            "businesses",
            "business_rut"
          ))
      )
      .test(
        "rut-exists",
        "Este Rut ya tiene una solicitud en curso",
        async (value) =>
          !(await checkIfValueExistsInDatabase(
            value,
            "business_admission_requests",
            "business_rut"
          ))
      ),
    legal_representative_firstname: Yup.string().required("Requerido"),
    legal_representative_lastname: Yup.string().required("Requerido"),
    legal_representative_rut: Yup.string()
      .required("Requerido")
      .matches(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/, "Rut inválido"),
    admin_contact_firstname: Yup.string().required("Requerido"),
    admin_contact_lastname: Yup.string().required("Requerido"),
    admin_contact_email: Yup.string()
      .required("Requerido")
      .email("Email inválido")
      .test(
        "email-exists",
        "Este email ya está registrado",
        async (value) =>
          !(await checkIfValueExistsInDatabase(value, "profiles", "email"))
      ),
    admin_contact_phone: Yup.number()
      .typeError("Debe incluir solo números")
      .min(100000000, "Debe incluir al menos 9 dígitos")
      .required("Requerido"),
    admin_contact_password: Yup.string()
      .required("Requerido")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    admin_contact_confirm_password: Yup.string()
      .required("Requerido")
      .oneOf(
        [Yup.ref("admin_contact_password"), null],
        "Las contraseñas no coinciden"
      ),
  });

  const handleSubmit = async (values) => {
    const dataInsert = { ...values };

    // try {
    //   await handleInsert(dataInsert);
    //   setSubmitting(true);
    // } catch (error) {
    //   console.log(error);
    //   setSubmitting(false);
    // }
  };

  return (
    <WebWidth>
      <WebHeading title="Hola 👋 registremos tu comercio " />
      {/* Hola 👋 Registremos tu comercio */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          const dataInsert = { ...values };
          await handleInsert(dataInsert);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="my-6">
          {formStart && (
            <>
              <GridForm cols="2" gapx="12">
                <Field
                  as={Input}
                  name="business_display_name"
                  type="text"
                  label="Nombre del comercio"
                />
                <Field
                  as={Input}
                  name="business_email"
                  type="text"
                  label="Email del comercio"
                  note="Tus clientes te contactan aquí"
                />
                <Field
                  as={Input}
                  name="business_legal_name"
                  type="text"
                  label="Razón social"
                />
                <Field
                  as={Input}
                  name="business_rut"
                  type="text"
                  label="RUT del comercio"
                  note="Ej: 12345678-9"
                />
              </GridForm>
              <UtilsDivider title="Contacto y ubicación del comercio" />
              <GridForm cols="2" gapx="12">
                <Field
                  as={InputPhone}
                  name="business_main_phone"
                  type="text"
                  label="Teléfono principal"
                />
                <Field
                  name="business_address"
                  type="text"
                  as={Input}
                  label="Dirección"
                />
                {/* <Field
              as={Select}
              name="business_commune"
              type="text"
              label="Comuna"
              options={[
                { value: "Las Condes", label: "Las Condes" },
                { value: "Lo Barnechea", label: "Lo Barnechea" },
                { value: "Vitacura", label: "Vitacura" },
              ]}
              note="Tu comercio debe ubicarse en una de estas comunas"
            /> */}
                <Field
                  name="business_commune"
                  type="text"
                  as={Input}
                  label="Comuna"
                />
                <Field
                  name="business_city"
                  type="text"
                  as={Input}
                  label="Ciudad"
                  // readOnly
                />
              </GridForm>
              <Button onClick={() => formStep("middle")} label="Continuar" />
            </>
          )}
          {formMiddle && (
            <>
              <UtilsDivider title="Datos del representante legal" />
              <GridForm cols="2" gapx="12">
                <Field
                  name="legal_representative_firstname"
                  type="text"
                  as={Input}
                  label="Nombres"
                />
                <Field
                  name="legal_representative_lastname"
                  type="text"
                  as={Input}
                  label="Apellidos"
                />
                <Field
                  name="legal_representative_rut"
                  type="text"
                  as={Input}
                  label="RUT"
                  note="Ej: 12345678-9"
                />
              </GridForm>
              <div className="w-1/3 ml-auto">
                <GridForm cols="2" gapx="2">
                  <Button onClick={() => formStep("start")} label="Atrás" />
                  <Button onClick={() => formStep("end")} label="Continuar" />
                </GridForm>
              </div>
            </>
          )}
          {formEnd && (
            <>
              <UtilsDivider
                title="Cuenta de acceso del administrador del comercio"
                description="Crea tus credenciales para administrar el comercio"
              />
              <GridForm cols="2" gapx="12">
                <Field
                  name="admin_contact_firstname"
                  type="text"
                  as={Input}
                  label="Nombre"
                />
                <Field
                  name="admin_contact_lastname"
                  type="text"
                  as={Input}
                  label="Apellidos"
                />
                <Field
                  name="admin_contact_phone"
                  type="text"
                  as={InputPhone}
                  label="Teléfono"
                />
              </GridForm>
              <div className="mb-5"></div>
              <UtilsDivider />
              <GridForm cols="2" gapx="12">
                <Field
                  name="admin_contact_email"
                  type="email"
                  as={Input}
                  label="Email"
                  note="Este email será tu usuario de acceso"
                  autoComplete="username"
                />
              </GridForm>
              <GridForm cols="2" gapx="12">
                <Field
                  name="admin_contact_password"
                  type="password"
                  as={Input}
                  label="Crea una contraseña"
                  autoComplete="new-password"
                />
                <Field
                  name="admin_contact_confirm_password"
                  type="password"
                  as={Input}
                  label="Repite la contraseña"
                  autoComplete="new-password"
                />
              </GridForm>
              <div className="mb-5"></div>
              <UtilsDivider />
              <div className="flex flex-row-reverse">
                <div className="pt-3 ml-1.5">
                  <FormButton
                    label="Inscribir Comercio"
                    loading={loading}
                    textLoading="Inscribiendo..."
                  />
                </div>
                <Button onClick={() => formStep("middle")} label="Atrás" />
              </div>
            </>
          )}
        </Form>
      </Formik>
    </WebWidth>
  );
};

export default NewBusiness;
