import { redirect } from "next/navigation";
import ServerAuth from "@/services/ServerAuth";
import BusinessDetail from "./BusinessDetail";

const BusinessDetailPage = async (req) => {
  const serverAuth = new ServerAuth();
  const currentUser = await serverAuth.getCurrentUser();

  if (currentUser.user === null) {
    redirect("/auth/signin");
  } else {
    console.log("currentUser", currentUser.user.user_metadata.role);
  }
  return <BusinessDetail req={req} />;
};

export default BusinessDetailPage;
