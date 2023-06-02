import { classNames } from "@/helpers/classnames";

export default function FormButton(props) {
  return (
    <div className="text-right">
      <button
        {...props}
        type="submit"
        className={classNames(
          "rounded bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          props.submitting === "true"
            ? "cursor-not-allowed bg-indigo-300"
            : "bg-indigo-600"
        )}
      >
        {props.label}
      </button>
    </div>
  );
}
