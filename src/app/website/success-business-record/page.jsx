const SignupConfirm = () => {
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
          <p className="text-base font-semibold text-indigo-600"></p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            La solicitud de registro de comercio ha sido ingresado con éxito,
            <p> pronto nos comunicaremos contigo.</p>
          </h1>
          <div className="mt-6 text-lg leading-7 text-gray-600">
            <p>
              Te hemos enviado un mensaje para confirmar tu correo electrónico,
            </p>
            <p> por favor completa la confirmación para poder continuar.</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupConfirm;
