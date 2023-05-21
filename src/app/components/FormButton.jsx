export default function FormButton({ label }) {
  return (
    <div className="text-right">
      <button
        type="submit"
        className="rounded bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {label}
      </button>
    </div>
  );
}
