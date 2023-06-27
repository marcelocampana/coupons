"use client";

import { useSupabase } from "../../supabase-provider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { FormButton, FormCoverImage, Input } from "@/app/components";
import { useState } from "react";

const UploadForm = () => {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (imageValues, newImageName) => {
    console.log(imageValues);
    if (imageValues) {
      const filePath = `prueba/${newImageName}`;
      const fileOptions = {
        upsert: true,
      };
      const { error } = await supabase.storage
        .from("business_images")
        .upload(filePath, imageValues);
      console.log(error);
      if (error && error.error === "Duplicate") {
        const { error: updateError } = await supabase.storage
          .from("business_images")
          .update(filePath, imageValues, fileOptions);

        if (updateError) {
          console.log(updateError);
        }
      }
    }
  };

  const validationSchema = Yup.object({
    business_logo_url: Yup.string().required("Required"),
  });

  const initialValues = {
    business_logo_url: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);

          await handleUpload(values.business_logo_url, "cover");
          setTimeout(() => {
            setLoading(false);
          }, 400);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="m-5">
            <Field
              name="business_logo_url"
              as={FormCoverImage}
              label="Imagen a subir"
              setFieldValue={setFieldValue}
              imageSize="h-20 w-20"
            />

            <FormButton label="Upload" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadForm;
