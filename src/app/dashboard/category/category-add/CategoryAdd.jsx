import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

// do not cache this page
export const revalidate = 0;

export default async function CategoryAdd() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data } = await supabase.from("categories").select("*");

  return (
    <>
      <h1>Category Add</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>)
    </>
  );
}
