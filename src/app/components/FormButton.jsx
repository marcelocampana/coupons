import { classNames } from "@/helpers/classnames";

export default function FormButton(props) {
  return (
    <div className="text-right">
      <button
        {...props}
        type="submit"
        className={classNames(
          "rounded  py-2 px-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          props.submitting === "true"
            ? "cursor-not-allowed bg-indigo-300 hover:bg-indigo-300"
            : "bg-indigo-600 hover:bg-indigo-500"
        )}
      >
        {props.label}
      </button>
    </div>
  );
}
