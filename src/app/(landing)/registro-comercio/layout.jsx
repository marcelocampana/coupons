import Carousel from "./Carousel";

const layout = ({ children }) => {
  const images = [
    "/images/newBusinessCarrousel/1.png",
    "/images/newBusinessCarrousel/2.png",
    "/images/newBusinessCarrousel/3.png",
  ];
  return (
    <>
      <div className="bg-custom-pink-881 p-5">
        <div className=" w-full">
          <img src="/logo.png" alt="header" className="mx-auto" />
        </div>
        {children}
        <div className="flex mb-8 hidden">
          <div>
            <img src="/images/layoutNewBusiness/atencion.png" alt="header" />
          </div>
          <div>
            <img src="/images/layoutNewBusiness/hombre.png" alt="header" />
          </div>
        </div>
        <div className="w-3/4 mx-auto">
          <Carousel images={images} />
        </div>
      </div>
      <div className="bg-yellow-400 py-2 text-right px-4">hola@chicupon.cl</div>
    </>
  );
};

export default layout;
