import coupons from "./coupons";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Coupon() {
  return (
    <div className="bg-white">
      <div className="mx-auto mb-12 max-w-2xl px-4 pt-16 sm:py-0 sm:px-2 lg:max-w-7xl lg:px-0">
        <div className="flex items-center justify-between space-x-4">
          {/*     <h2 className="text-lg font-medium text-gray-900">Cupones</h2> */}
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
          {coupons.map((product) => (
            <div key={product.id} className="rounded-lg border-2 bg-gray-50">
              <div className="group relative">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-lg">
                  <img
                    src={product.featuredImage}
                    alt={product.imageAlt}
                    className="object-cover object-center"
                  />
                  <div
                    className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                      Ver cupón
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {product.commerceId}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-between space-x-8 text-sm font-medium text-gray-900">
                    <h3>
                      <a href="#">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 "
                        />
                        {product.promo}
                      </a>
                    </h3>
                    <p>{product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
