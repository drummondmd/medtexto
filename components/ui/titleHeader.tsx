export default function TitleHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h4 className="mt-4 text-3xl font-light  text-gray-800">{title}</h4>
      {description ? (
        <p className="text-sm text-gray-600 mt-4 max-w-2xl leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
