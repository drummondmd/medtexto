import { RemuneType } from "./remune-container";

export default function RemuneDisplay({ display }: { display: RemuneType }) {
  const nothingTodisplay = display.remuneData.length === 0 ? true : false;

  ///jsx componentes
  function Card({
    item,
  }: {
    item: {
      item: number;
      descricao: string;
      nivel_atencao: string;
      local_acesso: string;
      classe: string;
    };
  }) {
    // const splitedDescricao = (item.descricao).split(",")
    // const newTitle = `${splitedDescricao[0]} (${splitedDescricao[1]})`

    const isPostinho = /primária/i.test(item.nivel_atencao);
    let baseClass = "bg-white p-4 m-2 rounded-lg shadow-sm border border-gray-200";

    if (isPostinho) {
      baseClass = "bg-white p-4 m-2 rounded-lg shadow-md border border-blue-500 relative";
    }

    return (
      <div className={baseClass}>
        {isPostinho && (
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-lg"></div>
        )}
        <h3 className="font-medium">{item.descricao}</h3>
        <p className="text-xs mb-2">{item.classe}</p>
        <p className="text-sm">{item.nivel_atencao}</p>
        <p className="text-sm">{item.local_acesso}</p>
      </div>
    );
  }

  return (
    <>
      {nothingTodisplay && (
        <p className="mt-4 p-4 font-semibold">
          Nenhuma medicação encontrada com os parâmetros acima.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4">
        {display.remuneData.map((item) => (
          <Card key={item.item} item={item} />
        ))}
      </div>
    </>
  );
}
