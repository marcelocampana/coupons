"use client";

import { useContext, useState } from "react";
import { useSupabase } from "../../supabase-provider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormButton,
  Input,
  UtilsDivider,
  GridForm,
  InputPhone,
} from "@/app/components";
import { BARContext } from "@/app/context/BARContext";

const FormStep1 = ({ formStep }) => {
  const { supabase } = useSupabase();
  const { updateStep1Value, step1Value } = useContext(BARContext);

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

  const initialValues = {
    business_display_name: step1Value.business_display_name
      ? step1Value.business_display_name
      : "",
    business_email: step1Value.business_email ? step1Value.business_email : "",
    business_main_phone: step1Value.business_main_phone
      ? step1Value.business_main_phone
      : "",
    business_address: step1Value.business_address
      ? step1Value.business_address
      : "",
    business_commune: step1Value.business_commune
      ? step1Value.business_commune
      : "",
    business_city: step1Value.business_city ? step1Value.business_city : "",
    business_legal_name: step1Value.business_legal_name
      ? step1Value.business_legal_name
      : "",
    business_rut: step1Value.business_rut ? step1Value.business_rut : "",
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
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const dataStep1 = { ...values };
        updateStep1Value(dataStep1);
        formStep("2");

        console.log(actions.values);

        actions.resetForm();
        actions.setValues(values);

        console.log(values);

        setTimeout(() => {
          //   setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="my-6">
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
          <Field
            name="business_commune"
            type="text"
            as={Input}
            label="Comuna"
          />
          <Field name="business_city" type="text" as={Input} label="Ciudad" />
        </GridForm>
        <FormButton loading={false} mt="8" label="Continuar" />
      </Form>
    </Formik>
  );
};

export default FormStep1;
