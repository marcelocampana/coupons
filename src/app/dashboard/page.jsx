import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: currentUser } = await supabase.auth.getUser();

  if (currentUser.user === null) {
    redirect("/signin");
  } else {
    console.log("currentUser", currentUser.user.user_metadata.role);
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
