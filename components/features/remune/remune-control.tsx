import SelectorGroup from "@/components/shared/selectorGroup/selector-group";

export default function RemuneControl({
  firstFilter,
  onSelectChange,
  display,
  cidades,
  query,
  onchangeQuery,
  onButtonClick,
  selectedIds,
}) {
  /// const classesOfMed = ["antivbioticos", "antidepressivo", "outros"].map((elem, idx) => ({ id: idx + "hash", label: elem }))

  return (
    <div>
      <div className="flex flex-col lg:flex-row  my-2 gap-4">
        <div className="basis-1/6">
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-800
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={onSelectChange}
            value={display.cidade}
          >
            {cidades.map((city) => (
              <option key={city.cidade} value={city.cidade}>
                {city.string}
              </option>
            ))}
          </select>
        </div>
        <div className="basis-3/6">
          <input
            placeholder="Digite a medicação a ser pequisada..."
            value={query}
            onChange={onchangeQuery}
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-800
         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <div>
          <SelectorGroup
            arrayOfSelectors={firstFilter}
            canMutateData={false}
            onClick={onButtonClick}
            selectedIds={selectedIds}
          />
        </div>
      </div>
    </div>
  );
}
