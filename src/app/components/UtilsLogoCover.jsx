const UtilsLogoCover = ({ logo, cover }) => {
  return (
    <>
      <div className="relative z-0 mt-5">
        <img
          src={cover ? cover : "/images/empty-cover.jpg"}
          alt="cover"
          className="rounded-sm"
        />
      </div>
      <div className="relative z-10 ">
        <img
          src={logo ? logo : "/images/empty-logo.jpg"}
          alt="logo"
          className="h-28 ml-5 -mt-12 rounded-full  p-1.5 bg-gray-100 "
        />
      </div>
    </>
  );
};

export default UtilsLogoCover;
