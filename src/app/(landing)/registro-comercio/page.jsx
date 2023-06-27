const page = () => {
  return (
    <>
      <div className="text-center m-12 text-white">
        <h1 className="font-bold text-4xl mb-4">
          Quieres aumentar tus ventas?{" "}
        </h1>
        <p className="px-32 text-xl">
          Inscríbete GRATIS en Chicupón y podrás ser parte de nuestra plataforma
          de descuentos! Ingresa tus cupones de descuentos y así podrás llegar a
          miles de usuarios.
        </p>
        <p className="italic font-semibold my-5 text-xl">
          Así de simple es Chicupón!, descuentos a un click!, estés donde estés!
        </p>
        <button
          type="button"
          className="rounded-md bg-indigo-50 px-5 py-4  font-semibold text-custom-pink-881 shadow-sm hover:bg-pink-100 mt-5 text-lg"
        >
          Regístrate gratis!
        </button>
      </div>
    </>
  );
};

export default page;
