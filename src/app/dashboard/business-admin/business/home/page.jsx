import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import Forbidden from "@/app/components/AdminForbidden";

import Hero from "./Hero";

const homePage = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data: currentUser } = await supabase.auth.getUser();

  // console.log(currentUser.user.id);

  if (currentUser.user === null) {
    redirect("/signin");
  } else if (currentUser.user.user_metadata.role === "business-admin") {
    return <Hero userId={currentUser.user.id} />;
  } else {
    return <Forbidden />;
  }
};

export default homePage;
