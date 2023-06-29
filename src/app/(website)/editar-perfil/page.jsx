"use client";
import { useSupabase } from "../../supabase-provider";

const page = async () => {
  const { supabase } = useSupabase();
  const { data: profile, error } = await supabase
    .from("profiles")
    .update({ business_id: "06456380-9c70-439a-b176-62d7ab502215" })
    .eq("id", "bc139725-4443-49b8-8995-36f8a022187d")
    .select();

  console.log(profile, error);

  return <div>page</div>;
};

export default page;
