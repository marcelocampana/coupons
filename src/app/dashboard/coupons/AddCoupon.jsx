"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input from "@/app/components/FormInput";
import Select from "@/app/components/FormSelect";
import Textarea from "@/app/components/FormTextarea";
import FormButton from "@/app/components/FormButton";
import GridForm from "@/app/components/UtilsGrid";
import Divider from "@/app/components/UtilsDivider";
import { ApiManager } from "@/services/ApiManager";

const AddCoupon = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        category_id: "",
        start_date: "",
        end_date: "",
        max_redeems_per_user: "",
        max_total_redeems: "",
        terms_and_conditions: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Requerido"),
        category_id: Yup.string().required("Requerido"),
        start_date: Yup.string().required("Requerido"),
        end_date: Yup.string().required("Requerido"),
        max_redeems_per_user: Yup.string().required("Requerido"),
        max_total_redeems: Yup.string().required("Requerido"),
        terms_and_conditions: Yup.string().required("Requerido"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("aqui");
          const updateValues = {
            ...values,
          };

          ApiManager.addData("coupons", updateValues);

          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="my-6 space-y-2">
        <GridForm cols="2" gapx="4">
          <Field as={Input} name="title" type="text" label="Título" />
          <Field
            as={Select}
            name="category_id"
            type="text"
            label="Categorias"
            values={[1, 2, 3]}
          />
        </GridForm>

        <Divider title="Condiciones" />
        <GridForm cols="2" gapx="4">
          <Field
            as={Input}
            name="start_date"
            type="date"
            label="Publicar desde"
          />
          <Field
            as={Input}
            name="end_date"
            type="date"
            label="Publicar hasta"
          />
          <Field
            as={Input}
            name="max_redeems_per_user"
            type="text"
            label="Máximo de canjes por usuario"
          />
          <Field
            as={Input}
            name="max_total_redeems"
            type="text"
            prompt="0 para ilimitado"
            label="Máximo de canjes por promoción"
          />
        </GridForm>
        <Field
          name="terms_and_conditions"
          as={Textarea}
          label="Otras condiciones"
          rows={6}
        />
        <FormButton label="Guardar" />
      </Form>
    </Formik>
  );
};

export default AddCoupon;
