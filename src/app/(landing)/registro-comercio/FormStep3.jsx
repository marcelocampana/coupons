import { useContext, useState } from "react";
import { BARContext } from "@/app/context/BARContext";
import { useSupabase } from "../../supabase-provider";
import { useRouter } from "next/navigation";
import { ClientAuth, BusinessAdmissionRequest } from "@/services";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormButton,
  Input,
  InputPhone,
  UtilsDivider,
  GridForm,
} from "@/app/components";

const FormStep3 = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { step1Value, step2Value, step3Value, updateStep3Value } =
    useContext(BARContext);
  const [adminContactLastname, setAdminContactLastname] = useState("");
  const [adminContactFirtname, setAdminContactFirtname] = useState("");

  console.log(adminContactFirtname);
  console.log(adminContactLastname);

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
    admin_contact_firstname: "",
    admin_contact_lastname: "",
    admin_contact_email: "",
    admin_contact_phone: "",
    admin_contact_password: "",
    admin_contact_confirm_password: "",
  };

  const validationSchema = Yup.object({
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setLoading(true);
        const dataStep3 = { ...values };
        updateStep3Value(dataStep3);
        const dataInsert = { ...step1Value, ...step2Value, ...values };
        console.log("dataInsert", dataInsert);
        await handleInsert(dataInsert);

        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="my-6">
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
        </div>
      </Form>
    </Formik>
  );
};

export default FormStep3;
