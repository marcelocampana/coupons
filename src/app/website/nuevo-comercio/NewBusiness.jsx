"use client";

import { useSupabase } from "../../supabase-provider";
import FormButton from "@/app/components/FormButton";
import Input from "@/app/components/FormInput";
import Select from "@/app/components/FormSelect";
import UtilsDivider from "@/app/components/UtilsDivider";
import GridForm from "@/app/components/UtilsGrid";
import WebHeading from "@/app/components/WebHeading";
import WebWidth from "@/app/components/WebWidth";
import { Auth } from "@/services/Auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const NewBusiness = () => {
  const { supabase } = useSupabase();

  async function checkIfValueExistsInDatabase(
    valueToValidate,
    tableToValidate,
    columnToValidate
  ) {
    const { data } = await supabase
      .from(tableToValidate)
      .select(columnToValidate)
      .eq(columnToValidate, valueToValidate);
    return data.length > 0;
  }

  const handleInsert = async (dataInsert) => {
    const email = dataInsert.account_contact_email;
    const password = dataInsert.account_contact_password;
    const firstname = dataInsert.admin_contact_firstname;
    const lastname = dataInsert.admin_contact_lastname;
    const role = "business-admin";

    const auth = new Auth();
    const signUpResult = await auth.signUp(
      { email, password, firstname, lastname, role },
      supabase
    );

    if (Object.keys(signUpResult.user).length !== 0) {
      const { id: userId } = signUpResult.user;
      const {
        account_contact_email,
        account_contact_password,
        account_contact_confirm_password,
        ...insertData
      } = dataInsert;

      try {
        const { data, error } = await supabase
          .from("businesses")
          .insert({
            admin_user_id: userId,
            created_at: new Date(),
            updated_at: new Date(),
            ...insertData,
          })
          .select();
        if (data) {
          router.push("/success-business-record");
        } else if (error) throw new Error(error);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <WebWidth>
      <WebHeading title="Inscribe tu comercio" />
      <Formik
        initialValues={{
          business_display_name: "",
          business_email: "",
          business_main_phone: "",
          business_address: "",
          business_commune: "",
          business_city: "Santiago",
          business_legal_name: "",
          business_rut: "",
          legal_representative_firstname: "",
          legal_representative_lastname: "",
          legal_representative_rut: "",
          admin_contact_firstname: "",
          admin_contact_lastname: "",
          admin_contact_email: "",
          admin_contact_phone: "",
          account_contact_email: "",
          account_contact_password: "",
          account_contact_confirm_password: "",
        }}
        validationSchema={Yup.object({
          business_display_name: Yup.string().required("Requerido"),
          business_email: Yup.string()
            .required("Requerido")
            .email("Email inválido")
            .test(
              "email-exists",
              "Este email ya está registrado",
              async (value) => {
                const exists = await checkIfValueExistsInDatabase(
                  value,
                  "businesses",
                  "business_email"
                );
                return !exists; // La prueba fallará si el RUT existe
              }
            ),

          business_main_phone: Yup.string().required("Requerido"),
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
              async (value) => {
                const exists = await checkIfValueExistsInDatabase(
                  value,
                  "businesses",
                  "business_rut"
                );
                return !exists; // La prueba fallará si el RUT existe
              }
            ),

          legal_representative_firstname: Yup.string().required("Requerido"),
          legal_representative_lastname: Yup.string().required("Requerido"),
          legal_representative_rut: Yup.string().required("Requerido"),
          admin_contact_firstname: Yup.string().required("Requerido"),
          admin_contact_lastname: Yup.string().required("Requerido"),
          admin_contact_email: Yup.string()
            .required("Requerido")
            .email("Email inválido")
            .test(
              "email-exists",
              "Este email ya está registrado",
              async (value) => {
                const exists = await checkIfValueExistsInDatabase(
                  value,
                  "businesses",
                  "admin_contact_email"
                );
                return !exists; // La prueba fallará si el RUT existe
              }
            ),
          admin_contact_phone: Yup.string().required("Requerido"),
          account_contact_email: Yup.string()
            .email("Email inválido")
            .required("Requerido"),
          account_contact_password: Yup.string()
            .required("Requerido")
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
          account_contact_confirm_password: Yup.string()
            .required("Requerido")
            .oneOf(
              [Yup.ref("account_contact_password"), null],
              "Las contraseñas no coinciden"
            ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const dataInsert = {
            ...values,
          };

          setTimeout(() => {
            handleInsert(dataInsert);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="my-6 space-y-2">
            <GridForm cols="2">
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
            <GridForm cols="2">
              <Field
                as={Input}
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
              <Field
                as={Select}
                name="business_commune"
                type="text"
                label="Comuna"
                options={[
                  { value: 1, label: "Las Condes" },
                  { value: 2, label: "Lo Barnechea" },
                  { value: 3, label: "Vitacura" },
                ]}
                note="Tu comercio debe ubicarse en una de estas comunas"
              />
              <Field
                name="business_city"
                type="text"
                as={Input}
                label="Ciudad"
                readOnly
              />
            </GridForm>

            <UtilsDivider title="Datos del representante legal" />
            <GridForm cols="2">
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
              />
            </GridForm>
            <UtilsDivider
              title="Cuenta de acceso del administrador del comercio"
              description="Crea tus credenciales para administrar el comercio"
            />
            <GridForm cols="2">
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
                as={Input}
                label="Teléfono"
              />
            </GridForm>
            <UtilsDivider />
            <GridForm cols="1">
              <Field
                name="admin_contact_email"
                type="email"
                as={Input}
                label="Email"
                note="Este email será tu usuario de acceso"
                autoComplete="username"
              />
            </GridForm>
            <GridForm cols="2">
              <Field
                name="account_contact_password"
                type="password"
                as={Input}
                label="Crea una contraseña"
                autoComplete="new-password"
              />

              <Field
                name="account_contact_confirm_password"
                type="password"
                as={Input}
                label="Repite la contraseña"
                autoComplete="new-password"
              />
            </GridForm>

            <UtilsDivider />
            <FormButton label="Inscribir Comercio" />
          </Form>
        )}
      </Formik>
    </WebWidth>
  );
};

export default NewBusiness;
