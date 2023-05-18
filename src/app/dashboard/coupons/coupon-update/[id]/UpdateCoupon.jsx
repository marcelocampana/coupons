"use client";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSupabase } from "../../../../supabase-provider";
import Input from "@/app/components/FormInput";
import Select from "@/app/components/FormSelect";
import Textarea from "@/app/components/FormTextarea";
import FormButton from "@/app/components/FormButton";
import GridForm from "@/app/components/UtilsGrid";
import Divider from "@/app/components/UtilsDivider";
import { usePathname } from "next/navigation";

const UpdateCoupon = () => {
  const pathname = usePathname();

  const { supabase } = useSupabase();
  const [coupons, setCoupons] = useState([]);
  const [categories, setCategories] = useState([]);

  const couponId = pathname.split("/")[4];

  const handleUpdate = async (dataToUpdate) => {
    const { data, error } = await supabase
      .from("coupons")
      .update(dataToUpdate)
      .eq("coupon_id", couponId);

    console.log(data, error);
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      const { data } = await supabase
        .from("coupons")
        .select("*")
        .eq("coupon_id", couponId);
      setCoupons(data);
    };
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("name, category_id");
      const newKeys = data.map((category) => ({
        value: category.category_id,
        label: category.name,
      }));
      setCategories(newKeys);
    };

    fetchCoupons();
    fetchCategories();
  }, []);
  console.log(coupons);

  console.log(categories);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: coupons.length > 0 ? coupons[0].title : "Cargando...",
        category_id: coupons.length > 0 ? coupons[0].category_id : 0,
        start_date:
          coupons.length > 0 &&
          new Date(coupons[0].start_date).toISOString().split("T")[0],

        end_date:
          coupons.length > 0 &&
          new Date(coupons[0].end_date).toISOString().split("T")[0],

        max_redeems_per_user:
          coupons.length > 0 && coupons[0].max_redeems_per_user,
        max_total_redeems: coupons.length > 0 && coupons[0].max_total_redeems,
        terms_and_conditions:
          coupons.length > 0 ? coupons[0].terms_and_conditions : "Cargando...",
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
        const dataToUpdate = {
          business_id: "802aeee9-6617-4d61-bba5-e7f02bf8093a",
          created_at: new Date(),
          updated_at: new Date(),
          ...values,
        };

        setTimeout(() => {
          // console.log(dataToUpdate);

          handleUpdate(dataToUpdate);
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
            options={categories}
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
            type="number"
            label="Máximo de canjes por usuario"
          />
          <Field
            as={Input}
            name="max_total_redeems"
            type="number"
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

export default UpdateCoupon;
