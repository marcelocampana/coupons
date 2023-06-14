import supabase from "@/connections/supabase";
//import { supabase } from "@/connections/supabase-admin";

async function handleDeleteUser(id) {
  try {
    const response = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    });

    const result = await response.json();

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function deleteProfile(id) {
  const profileDeleteResult = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  console.log(profileDeleteResult);

  if (profileDeleteResult.error) {
    console.error("Error deleting profile:", error);
    return false;
  } else {
    const resultDeleteUser = await handleDeleteUser(id);
    console.log("resultDeleteUser", resultDeleteUser);
    return resultDeleteUser;
  }
}

const deleteUser = async (id) => {
  await deleteProfile(id);
  const resultDeleteUser = await handleDeleteUser(id);
  console.log("resultDeleteUser", resultDeleteUser);
  return resultDeleteUser;
};

export default deleteUser;
