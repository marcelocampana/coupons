"use client";

import { useState } from "react";
import CallToAction from "./CallToAction";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="text-center mt-12 mb-36 text-white">
        <img src="/logo.png" alt="header" className="mx-auto w-36 mb-1" />
        <p className="italic font-semibold my-5 text-lg text-gray-500 mb-12">
          Descuentos a un click! Estés donde estés!
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          ¡Impulsa tu comercio{" "}
          {/* <span className="text-custom-calypso-fe3">Chicureo </span>*/} con{" "}
          <span className="text-custom-fuchsia-07e"> Chicupón!</span>
        </h1>
        <div className="my-8 text-lg leading-8 text-gray-600">
          <p className="px-32 text-xl">
            Atrae a nuevos clientes y aumenta tus ventas al publicar cupones de
            descuento <span className="text-gray-600">gratis*.</span>
          </p>
          <p className="font-bold">¡Únete a nuestra plataforma ahora!</p>
        </div>
        <CallToAction label="Inscribe tu comercio aquí" />

        <p className="text-sm mt-3 text-gray-500">
          *Promoción válida para inscripciones realizadas antes del lanzamiento
          oficial de Chicupón.
        </p>
        {/* <p className="italic font-semibold my-5 text-xl">
            Así de simple es Chicupón!, descuentos a un click!, estés donde
            estés!
          </p> */}
      </div>
    </>
  );
};

export default Header;
