const Button = (props) => {
  return (
    <div className="mx-auto text-center">
      <button
        {...props}
        type="button"
        className="rounded-3xl bg-indigo-50 px-5 py-2  font-semibold bg-custom-fuchsia-07e shadow-sm  text-lg text-white hover:bg-pink-700"
      >
        {props.label}
      </button>
    </div>
  );
};

export default Button;
