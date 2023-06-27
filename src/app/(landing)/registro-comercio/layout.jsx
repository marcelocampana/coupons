import Carousel from "./Carousel";

const layout = ({ children }) => {
  const images = [
    "/images/newBusinessCarrousel/1.jpg",
    "/images/newBusinessCarrousel/2.jpg",
    "/images/newBusinessCarrousel/3.jpg",
  ];
  return (
    <div className="bg-custom-pink-881">
      <Carousel images={images} />
      <img src="/images/layoutNewBusiness/header-landing.jpg" alt="header" />
      {children}
      <img src="/images/layoutNewBusiness/footer-landing.jpg" alt="header" />
    </div>
  );
};

export default layout;
