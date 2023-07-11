const Button = ({ label }) => {
  return (
    <div className="mx-auto text-center">
      <button
        type="button"
        className="rounded-3xl bg-indigo-50 px-5 py-2  font-semibold bg-custom-fuchsia-07e shadow-sm  text-lg text-white hover:bg-pink-700"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
