"use client";

import { useState } from "react";
import { useSupabase } from "../../supabase-provider";

export default function AddCategory() {
  const cat = {
    name: "Alimentos",
    slug: "2023-05-09T14:30:00.000-04:00",
    description: "Category description",
    updated_at: "2023-05-09T14:30:00.000-04:00",
    created_at: "2023-05-09T14:30:00.000-04:00",
  };

  const [content, setContent] = useState("");
  const { supabase } = useSupabase();

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("categories")
      .insert(cat)
      .select();
    console.log(error);
  };

  handleSave();

  return (
    <>
      <input onChange={(e) => setContent(e.target.value)} value={content} />
      <button onClick={handleSave}>Save</button>
    </>
  );
}
