const Button = ({ label, action, children }) => {
  return (
    <div className="mr-2 md:mr-5 inline-flex">
      {children}
      <button type="button" onClick={action} className="text-gray-500 text-md">
        {label}
      </button>
    </div>
  );
};

export default Button;
