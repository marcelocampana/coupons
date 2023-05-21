import { useState } from "react";
import { useSupabase } from "../supabase-provider";

const InputEmail = (props) => {
  const [validationMsj, setValidationMsj] = useState("");
  const { supabase } = useSupabase();

  async function checkIfEmailExistsInDatabase(email) {
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq(props.name, email);
    return data.length > 0;
  }

  const handleChange = async (e) => {
    if (!e.target.value) {
      setValidationMsj("Requerido");
    } else if (
      !/^[\w.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{2,})$/.test(
        e.target.value
      )
    ) {
      setValidationMsj("Email inválido");
    } else {
      setValidationMsj("");
      const rutExists = await checkIfEmailExistsInDatabase(e.target.value);
      if (rutExists) {
        setValidationMsj("Este email ya está registrado");
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
          {props.label}
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

export default InputEmail;
