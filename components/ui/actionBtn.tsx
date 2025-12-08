export default function ActionButton({
  onClick,
  variant,
  title,
  disable,
}: {
  disable: boolean;
  onClick: () => void;
  variant: "yellow" | "blue";
  title: string;
}) {
  const baseClass =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  let color: string;
  if (variant === "yellow") {
    color = "bg-[#6f481c] hover:bg-mt-yellow";
  }
  if (variant === "blue") {
    color = "bg-mt-primary hover:bg-mt-secondary";
  }

  return (
    <button type="button" onClick={onClick} className={baseClass + " " + color} disabled={disable}>
      {title}
    </button>
  );
}
