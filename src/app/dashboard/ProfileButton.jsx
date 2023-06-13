"use client";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";

const ProfileButton = () => {
  const { supabase } = useSupabase();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data && data.session.user.user_metadata) {
      const { firstname, lastname, role } = data.session.user.user_metadata;
      setFullName(`${firstname} ${lastname}`);
      setRole(role);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700">
      <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
      <span className="sr-only">Your profile</span>
      <div className="block text-left">
        <div aria-hidden="true" className="text-base">
          {fullName}
        </div>
        <div aria-hidden="true" className="-mt-1 ">
          {role === "admin" ? "Administrador" : "Admin. del comercio"}
        </div>
        <button
          onClick={handleSignOut}
          aria-hidden="true"
          className="-mt-1 text-gray-300"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default ProfileButton;
