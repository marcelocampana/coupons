const ImageStep = () => {
  const steps = [
    {
      id: "1",
      name: "Job details",
      href: "#",
      status: "complete",
    },
    {
      id: "2",
      name: "Application form",
      href: "#",
      status: "current",
    },
    { id: "3", name: "Preview", href: "#", status: "upcoming" },
  ];

  return (
    <>
      <nav aria-label="Progress">
        <h3 className="text-center mb-8 text-2xl text-gray-500 font-bold">
          Conoce Chicupón en 3 simples pasos
        </h3>
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step) => (
            <li key={step.name} className="md:flex-1">
              <div
                className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-lg font-medium text-gray-600 mb-4">
                  {/* {step.id} */}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid grid-cols-3 gap-x-8">
        <img
          src="/images/newBusinessCarrousel/1.jpg"
          alt="chicupon bases"
          className="rounded-sm"
        />
        <img
          src="/images/newBusinessCarrousel/2.jpg"
          alt="chicupon bases"
          className="rounded-sm"
        />
        <img
          src="/images/newBusinessCarrousel/3.jpg"
          alt="chicupon bases"
          className="rounded-sm"
        />
      </div>

      <p className="text-center text-gray-500 text-md mt-12">
        Así de simple es Chicupón! Descuentos a un click! Estés donde estés!
      </p>
    </>
  );
};

export default ImageStep;
