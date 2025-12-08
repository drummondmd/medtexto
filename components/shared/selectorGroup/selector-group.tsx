import Selector from "./selector";

type Props = {
  arrayOfSelectors: Array<{ id: string; label: string }>;
  selectedIds: string[];
  canMutateData: boolean;
  onClick: (e) => void;
  onCopy?: (e) => void;
  onDelete?: (e) => void;
  multiple?: boolean;
};

export default function SelectorGroup({
  multiple = false,
  arrayOfSelectors,
  selectedIds,
  canMutateData,
  onClick,
  onDelete,
}: Props) {
  function handleToggle(id: string) {
    if (multiple) {
      const exists = selectedIds.includes(id);
      const next = exists ? selectedIds.filter((x) => x !== id) : [...selectedIds, id];
      onClick(next);
    } else {
      onClick([id]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {arrayOfSelectors.map((elem) => (
        <Selector
          key={elem.id}
          title={elem.label}
          isSelected={selectedIds.includes(elem.id)}
          canMutateData={canMutateData}
          onClick={() => handleToggle(elem.id)}
          onDelete={() => onDelete(elem.id)}
        />
      ))}
    </div>
  );
}
