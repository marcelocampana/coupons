"use client";

import { useSupabase } from "../../supabase-provider";

const Form = () => {
  const { supabase } = useSupabase();
  const deleteFiles = async (e) => {
    console.log(e);
    e.preventDefault();
    const { data, error } = await supabase.storage
      .from("business_images")
      .remove(["prueba/cover"]);

    console.log(data, error);
  };

  return (
    <form onSubmit={deleteFiles}>
      <button type="submit">Eliminar archivos</button>
    </form>
  );
};

export default Form;
