import Heading from "@/app/components/AdminHeading";
import Form from "./AddCoupon";
import AddCategory from "./AddCategory";

export default function Page() {
  return (
    <div>
      <Heading title="Cupones" />
      <Form />
      <AddCategory />
    </div>
  );
}
