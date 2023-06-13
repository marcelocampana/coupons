"use client";

import { useState } from "react";
import { useSupabase } from "../../../../../supabase-provider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  FormButton,
  Input,
  Select,
  UtilsDivider,
  GridForm,
  WebHeading,
  WebWidth,
  InputPhone,
  FormCoverImage,
} from "@/app/components";
import { BusinessAdmissionRequest } from "@/services";
import InputAddon from "@/app/components/FormInputAddon";
import Textarea from "@/app/components/FormTextarea";
import UtilsSuccessNotification from "@/app/components/UtilsSuccessNotification";

const UpdateForm = ({ businessAdmissionRequestsData }) => {
  const { supabase } = useSupabase();

  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  const {
    business_admission_request_id,
    business_display_name,
    business_email,
    business_main_phone,
    business_address,
    business_commune,
    business_city,
    business_legal_name,
    business_rut,
    business_logo_url,
    business_cover_url,
    business_description,
    legal_representative_firstname,
    legal_representative_lastname,
    legal_representative_rut,
    admin_contact_firstname,
    admin_contact_lastname,
    admin_contact_phone,
    business_website,
    business_facebook,
    business_instagram,
    business_whatsapp,
  } = businessAdmissionRequestsData[0];

  const handleImageUpload = async (imageValues, newImageName) => {
    if (imageValues) {
      const filePath = `${business_admission_request_id}/${newImageName}`;
      const fileOptions = {
        upsert: true,
      };

      const { error } = await supabase.storage
        .from("business_images")
        .upload(filePath, imageValues);

      if (error && error.error === "Duplicate") {
        const { error: updateError } = await supabase.storage
          .from("business_images")
          .update(filePath, imageValues, fileOptions);

        if (updateError) {
          console.log(updateError);
        }
      }

      const { data } = supabase.storage
        .from("business_images")
        .getPublicUrl(filePath);

      return data;
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

  const handleUpdate = async (dataToUpdate) => {
    const { business_logo_url, business_cover_url, ...dataToFinalUpdate } =
      dataToUpdate;

    const logoImageURL =
      typeof business_logo_url !== "string"
        ? await handleImageUpload(business_logo_url, "logo")
        : business_logo_url;

    const coverImageURL =
      typeof business_cover_url !== "string"
        ? await handleImageUpload(business_cover_url, "cover")
        : business_cover_url;

    try {
      const dataUpdate = {
        updated_at: new Date(),
        business_admin_updated_at: new Date(),
        business_logo_url: logoImageURL.publicUrl,
        business_cover_url: coverImageURL.publicUrl,
        ...dataToFinalUpdate,
      };

      const dbQuery = new BusinessAdmissionRequest(supabase);
      const data = await dbQuery.updateRecord(
        "business_admission_request_id",
        business_admission_request_id,
        dataUpdate
      );

      if (data) {
        console.log(data);
        setShow(true);
      } else {
        throw new Error("Error al actualizar el registro del comercio.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    business_display_name,
    business_email,
    business_main_phone,
    business_address,
    business_commune,
    business_city,
    business_legal_name,
    business_rut,
    business_logo_url,
    business_cover_url,
    business_description,
    legal_representative_firstname,
    legal_representative_lastname,
    legal_representative_rut,
    admin_contact_firstname,
    admin_contact_lastname,
    admin_contact_phone,
    business_website: business_website || "",
    business_facebook: business_facebook || "",
    business_instagram: business_instagram || "",
    business_whatsapp: business_whatsapp || "",
  };

  const validationSchema = Yup.object({
    business_display_name: Yup.string().required("Requerido"),
    business_email: Yup.string()
      .required("Requerido")
      .email("Email inválido")
      .test("email-exists", "Este email ya está registrado", async (value) => {
        if (value !== business_email) {
          return !(await checkIfValueExistsInDatabase(
            value,
            "businesses",
            "business_email"
          ));
        }
        return true;
      })
      .test(
        "rut-exists",
        "Este email ya tiene una solicitud en curso",
        async (value) => {
          if (value !== business_email) {
            return !(await checkIfValueExistsInDatabase(
              value,
              "business_admission_requests",
              "business_email"
            ));
          }
          return true;
        }
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
      .test("rut-exists", "Este Rut ya está registrado", async (value) => {
        if (value !== business_rut) {
          return !(await checkIfValueExistsInDatabase(
            value,
            "businesses",
            "business_rut"
          ));
        }
        return true;
      })
      .test(
        "rut-exists",
        "Este Rut ya tiene una solicitud en curso",
        async (value) => {
          if (value !== business_rut) {
            return !(await checkIfValueExistsInDatabase(
              value,
              "business_admission_requests",
              "business_rut"
            ));
          }
          return true;
        }
      ),
    business_description: Yup.string().required("Requerido"),
    legal_representative_firstname: Yup.string().required("Requerido"),
    legal_representative_lastname: Yup.string().required("Requerido"),
    legal_representative_rut: Yup.string()
      .required("Requerido")
      .matches(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/, "Rut inválido"),
    admin_contact_firstname: Yup.string().required("Requerido"),
    admin_contact_lastname: Yup.string().required("Requerido"),
    admin_contact_phone: Yup.number()
      .typeError("Debe incluir solo números")
      .min(100000000, "Debe incluir al menos 9 dígitos")
      .required("Requerido"),
    business_website: Yup.string().matches(
      /^(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9_-]+)*$/,
      "Por favor, ingresa una URL válida"
    ),

    business_whatsapp: Yup.number()
      .typeError("Debe incluir solo números")
      .min(100000000, "Debe incluir al menos 9 dígitos"),
    business_cover_url: Yup.mixed()
      .test("fileType", "Formato de imagen inválido", (value) => {
        const supportedFormats = ["image/jpeg", "image/png"];
        return typeof value !== "string"
          ? value && supportedFormats.includes(value.type)
          : true;
      })
      .test(
        "fileSize",
        "Tamaño de imagen es superior al permitido (Máximo 0.5 MB)",
        (value) => {
          const maxSizeInBytes = 0.5 * 1024 * 1024; // 0.5 MB
          return typeof value !== "string"
            ? value && value.size <= maxSizeInBytes
            : true;
        }
      )
      .required("Imagen destacada es requerida"),
    business_logo_url: Yup.mixed()
      .test("fileType", "Formato de imagen inválido", (value) => {
        const supportedFormats = ["image/jpeg", "image/png"];
        return typeof value !== "string"
          ? value && supportedFormats.includes(value.type)
          : true;
      })
      .test(
        "fileSize",
        "Tamaño de imagen es superior al permitido (Máximo 0.5 MB)",
        (value) => {
          const maxSizeInBytes = 0.5 * 1024 * 1024; // 0.5 MB
          return typeof value !== "string"
            ? value && value.size <= maxSizeInBytes
            : true;
        }
      )
      .required("Logo es requerido"),
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);

    const dataToUpdate = { ...values };

    try {
      await handleUpdate(dataToUpdate);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <WebWidth>
      <WebHeading title="Datos del comercio" />
      <div className="text-sm text-gray-600 mt-1">Estado: En revisión</div>
      <UtilsSuccessNotification
        show={show}
        setShow={setShow}
        text="Registro actualizado exitosamente"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="my-6 space-y-2">
            <GridForm cols="2" gapx="20">
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

            <Field
              name="business_logo_url"
              as={FormCoverImage}
              label="Logo"
              note="Este logo será el que se muestre en la página de tu comercio (Medidas recomendadas: 300x300 pixeles)"
              setFieldValue={setFieldValue}
              imageSize="h-20 w-20"
              dbUrl={business_logo_url}
            />
            <Field
              name="business_cover_url"
              as={FormCoverImage}
              label="Imagen destacada"
              note="Esta imagen será la que se muestre en la página de tu comercio (Medidas recomendadas: 1920x1080 pixeles)"
              setFieldValue={setFieldValue}
              imageSize="w-full"
              dbUrl={business_cover_url}
            />

            <Field
              as={Textarea}
              name="business_description"
              label="Descripción del comercio"
              note="Una breve descripción de tu comercio que leerán tus clientes"
              rows="4"
            />
            <UtilsDivider title="Contacto y ubicación del comercio" />
            <GridForm cols="2">
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
                note="Ej: 12345678-9"
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
                type="file"
                as={InputPhone}
                label="Teléfono"
              />
            </GridForm>
            <UtilsDivider />

            <UtilsDivider title="Canales digitales" />
            <GridForm cols="2">
              <Field
                name="business_website"
                as={InputAddon}
                label="Sitio web"
                addon="https://"
                placeholder="www.tusitio.com"
              />
              <Field
                name="business_facebook"
                as={InputAddon}
                label="Facebook"
                addon="https://www.facebook.com/"
                placeholder="tu_pagina"
              />
              <Field
                name="business_instagram"
                as={InputAddon}
                label="Instagram"
                addon="https://www.instagram.com/"
                placeholder="tu_cuenta"
              />
              <Field
                name="business_whatsapp"
                as={InputAddon}
                label="Whatsapp"
                addon="+56"
                placeholder="912345678"
                maxLength="9"
              />
            </GridForm>
            <UtilsDivider />

            <FormButton
              label={submitting ? "Actualizando..." : "Actualizar datos"}
              disabled={submitting}
              submitting={submitting.toString()}
            />
          </Form>
        )}
      </Formik>
    </WebWidth>
  );
};

export default UpdateForm;
