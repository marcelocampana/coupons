"use client";

import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import { BARProvider } from "@/app/context/BARContext";
import FormStep3 from "./FormStep3";
import { useState } from "react";
import { WebHeading } from "@/app/components";
import HeadStepsForm from "./HeadStepsForm";

const FormAllSteps = () => {
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  const formStep = (target) => {
    if (target === "1") {
      setForm1(true);
      setForm2(false);
      setForm3(false);
    } else if (target === "2") {
      setForm1(false);
      setForm2(true);
      setForm3(false);
    } else if (target === "3") {
      setForm1(false);
      setForm2(false);
      setForm3(true);
    }
  };
  return (
    <>
      <WebHeading title="Hola 👋 Registremos tu comercio " />
      <BARProvider>
        <HeadStepsForm
          form1={form1}
          form2={form2}
          form3={form3}
          formStep={formStep}
        />
        {form1 && <FormStep1 formStep={formStep} />}
        {form2 && <FormStep2 formStep={formStep} />}
        {form3 && <FormStep3 formStep={formStep} />}
      </BARProvider>
    </>
  );
};

export default FormAllSteps;
