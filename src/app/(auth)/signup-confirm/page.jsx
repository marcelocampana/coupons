"use client";

import { useRouter } from "next/navigation";

const SignupConfirm = () => {
  //const pathname = useSearchParams();
  const router = useRouter();

  setTimeout(() => {
    router.push("/signin");
  }, 3000);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Exelente!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Haz completado tu registro de usuario.
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Estás siendo redirigido al inicio de sesión...
            <span
              className="ml-1 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-green-500"
              role="status"
            ></span>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignupConfirm;
