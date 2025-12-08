type StatusCode = "success" | "error" | "info";

export default function StatusBar({
  statusCode,
  statusMessage,
}: {
  statusCode: StatusCode;
  statusMessage: string;
}) {
  const variants: Record<StatusCode, string> = {
    info: "text-blue-600",
    error: "text-red-600",
    success: "text-green-600",
  };

  return (
    <div role="status" aria-live="polite" className="w-full text-center">
      <span className={`text-sm ${variants[statusCode]} text-clip`}>{statusMessage}</span>
    </div>
  );
}
