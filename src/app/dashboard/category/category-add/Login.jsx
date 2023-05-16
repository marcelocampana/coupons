"use client";

import { useSupabase } from "../../../supabase-provider";

export default function Login() {
  const { supabase } = useSupabase();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "marcelo.campana@webmometro.com",
      password: "12345@",
      options: {
        data: {
          firstname: "Marcelo",
          lastname: "Campaña",
          role: "admin",
        },
      },
    });

    console.log(data);
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "marcelo.campana@webmometro.com",
      password: "12345@",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
