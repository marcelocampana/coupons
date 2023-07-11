import classNames from "@/helpers/classnames";

export default function FormButton({ loading, label, textLoading, mt }) {
  return (
    <div className="text-right">
      <button
        disabled={loading}
        type="submit"
        className={classNames(
          `mt-${mt} rounded   py-3 px-8 text-sm font-semibold text-white bg-custom-fuchsia-07e hover:bg-pink-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-purple-282`,
          loading && "cursor-not-allowed opacity-50"
        )}
      >
        {loading ? textLoading : label}
      </button>
    </div>
  );
}
