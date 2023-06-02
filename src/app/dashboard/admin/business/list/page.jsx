import { redirect } from "next/navigation";
import ServerAuth from "@/services/ServerAuth";
import RequestList from "./RequestList";

const RequestListPage = async () => {
  const serverAuth = new ServerAuth();
  const currentUser = await serverAuth.getCurrentUser();

  if (currentUser.user === null) {
    redirect("/auth/signin");
  } else {
    console.log("currentUser", currentUser.user.user_metadata.role);
  }
  return <RequestList />;
};

export default RequestListPage;
