"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "¿Qué comercios pueden inscribirse en Chicupón?",
    answer:
      "No importa si tienes un pequeño negocio, una tienda en línea o una cadena de tiendas, si tu comercio se encuentra en la zona oriente de Santiago, regístrate en Chicupón y aprovecha las ventajas que ofrecemos para impulsar tu negocio. Damos la bienvenida a una amplia variedad de comercios que deseen promocionar sus productos y servicios brindando un enfoque centrado y específico a los comercios de esta zona. Te ofrecemos oportunidades únicas para llegar a una audiencia altamente relevante y comprometida con los descuentos y ofertas exclusivas del comercio local.",
  },
  {
    question: "¿Qué beneficios ofrece Chicupón para mi comercio?",
    answer:
      "Impulsamos el crecimiento y las ventas de tu comercio al ofrecer acceso a una amplia base de usuarios interesados en descuentos exclusivos. A través de nuestra plataforma, obtendrás mayor visibilidad, gestión simplificada de cupones, reportes de resultados y la posibilidad de aprovechar el boca a boca y la viralidad de las ofertas compartidas. ¡Únete a Chicupón para descubrir todos los beneficios que tenemos para ofrecerte y lograr el éxito para tu comercio!",
  },
  {
    question: "¿Cuando estará disponible Chicupón?",
    answer:
      "¡Estamos trabajando arduamente para estar disponible lo antes posible! Actualmente nos encontramos en las fases finales. Luego de que registres tu comercio te compartiremos novedades y detalles sobre las fechas de disponibilidad de Chicupon. Gracias por tu paciencia e interés en nuestra plataforma ¡Estamos ansiosos por brindarte una experiencia increíble de descuentos y ofertas!",
  },
  {
    question: "¿Existirá algún costo por estar registrado y publicar cupones?",
    answer:
      "Sí y no. Si registras tu comercio en Chicupón ahora o durante nuestro prelanzamiento, te daremos un plan sin límites con 3 meses de gratuidad a partir de cuando estemos en línea. Después de ese periodo podrás continuar con un plan gratuito que te permitirá publicar un número limitado de cupones sin costo. También podras optar a planes pagados con diferentes niveles y precios dependiendo de la cantidad de cupones que desees publicar. Estos planes pagados te brindarán beneficios adicionales y una mayor exposición para tu comercio. ¡Regístrate durante el prelanzamiento y aprovecha los 3 meses gratuitos para descubrir cómo Chicupón puede ayudar a impulsar tu negocio!",
  },
  // More questions...
];

const FAQ = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-16 mt-16 ">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-600 text-center">
            Preguntas frecuentes
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
