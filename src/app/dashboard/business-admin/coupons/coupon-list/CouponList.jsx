import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export const revalidate = 0;

const CouponsList = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const { data: coupons, error } = await supabase.from("coupons").select("*");
  console.log(coupons, error);
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Cupones publicados
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar un cúpon
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Promo
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Inicio de publicación
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Fin de publicación
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Categoría
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, i) => (
                <tr key={i}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {coupon.title}
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {coupon.start_date}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {coupon.end_date}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {coupon.category_id}
                  </td>
                  <td className="relative py-4 pl-3 text-right text-sm font-medium">
                    <a
                      href={`/dashboard/coupons/coupon-update/${coupon.coupon_id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                      <span className="sr-only">, {coupon.coupon_id}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponsList;
