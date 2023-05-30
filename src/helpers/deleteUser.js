import supabase from "@/connections/supabase";

const deleteUser = async ({ userId }) => {
  async function handleDeleteUser() {
    try {
      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      const result = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error("Failed to delete user:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      return false;
    }
  }

  async function deleteProfile() {
    console.log(userId);
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      console.error("Error deleting profile:", error);
      return false;
    } else {
      return handleDeleteUser();
    }
  }

  return await deleteProfile();
};

export default deleteUser;
