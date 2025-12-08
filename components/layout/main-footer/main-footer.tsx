import myPackage from "@/package.json";

export default function MainFooter() {
  const { version } = myPackage;

  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className=" bg-mt-secondary flex flex-wrap justify-between items-center px-4 py-2 border-t">
      <span className="text-gray-900 text-sm">Todos os direitos reservados. © {year}</span>
      <span className=" text-gray-900 text-sm">Versão Beta: {version}</span>
    </div>
  );
}
