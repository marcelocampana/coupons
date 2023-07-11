import Footer from "./Footer";
import Background from "./Background";
import FAQ from "./FAQ";
import ImageStep from "./ImageStep";
import Header from "./Header";
import Background2 from "./Background2";
import Button from "./Button";
import Modal from "./Modal";

const page = () => {
  return (
    <>
      <Background>
        <div className="max-w-7xl mx-auto">
          <Header />
          <ImageStep />
        </div>
      </Background>
      <Background2>
        <FAQ />
        <Button label="¡Registra tu comercio ahora!" />
      </Background2>

      <Footer />
      <Modal />
    </>
  );
};

export default page;
