import { BARContext } from "@/app/context/BARContext";
import { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormButton, Input, UtilsDivider, GridForm } from "@/app/components";

const FormStep2 = ({ formStep }) => {
  const { step2Value, updateStep2Value } = useContext(BARContext);

  const initialValues = {
    legal_representative_firstname: step2Value.legal_representative_firstname
      ? step2Value.legal_representative_firstname
      : "",
    legal_representative_lastname: step2Value.legal_representative_lastname
      ? step2Value.legal_representative_lastname
      : "",
    legal_representative_rut: step2Value.legal_representative_rut
      ? step2Value.legal_representative_rut
      : "",
  };

  const validationSchema = Yup.object({
    legal_representative_firstname: Yup.string().required("Requerido"),
    legal_representative_lastname: Yup.string().required("Requerido"),
    legal_representative_rut: Yup.string()
      .required("Requerido")
      .matches(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/, "Rut inválido"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const dataStep2 = { ...values };
          updateStep2Value(dataStep2);
          formStep("3");
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="my-6">
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
            <FormButton loading={false} label="Continuar" />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default FormStep2;
