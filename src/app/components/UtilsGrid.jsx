export default function GridForm({ children, cols, gapx }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${cols} gap-x-${gapx} gap-y-2 `}
    >
      {children}
    </div>
  );
}
