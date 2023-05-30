import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

class ServerAuth {
  constructor() {
    this.user = null;
    this.supabase = createServerComponentSupabaseClient({
      headers,
      cookies,
    });
  }

  async getCurrentUser() {
    const { data: currentUser } = await this.supabase.auth.getUser();
    return currentUser;
  }
}

export default ServerAuth;
