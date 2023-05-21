import { useState } from "react";
import { useSupabase } from "../supabase-provider";

const InputRut = (props) => {
  const [validationMsj, setValidationMsj] = useState("");
  const { supabase } = useSupabase();

  async function checkIfRutExistsInDatabase(rut) {
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq("business_rut", rut);
    return data.length > 0;
  }

  const handleChange = async (e) => {
    if (!e.target.value) {
      setValidationMsj("Requerido");
    } else if (!/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/.test(e.target.value)) {
      setValidationMsj("Rut inválido");
    } else {
      setValidationMsj("");
      const rutExists = await checkIfRutExistsInDatabase(e.target.value);
      if (rutExists) {
        setValidationMsj("Este Rut ya está registrado");
      }
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-1"
        >
          RUT
        </label>
        <input
          {...props}
          onInput={handleChange}
          name={props.name}
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        />
        <p className="mt-2 text-sm text-gray-500">{props.note}</p>
        <div className="text-red-500 mt-1 text-sm">
          <p>{validationMsj}</p>
        </div>
      </div>
    </>
  );
};

export default InputRut;
