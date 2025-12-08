import { Trash2 } from "lucide-react";
import { Activity } from "react";

export default function Selector({ title, isSelected, canMutateData, onClick, onDelete }) {
  const baseClass = "flex-1 px-3 py-2 rounded-l-md transition-all duration-200 font-medium text-sm";
  const selected = "bg-mt-primary text-white shadow-md";
  const notSelected = "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200";

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Selector Button */}
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} ${isSelected ? selected : notSelected} ${
          canMutateData && "rounded-l-md"
        }`}
      >
        {title}
      </button>

      {/* Delete Button */}
      <Activity mode={canMutateData ? "visible" : "hidden"}>
        <button
          onClick={onDelete}
          title="Deletar item"
          className="px-2 py-2 border-l border-gray-300 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-r-md"
          aria-label={`Deletar ${title}`}
        >
          <Trash2 size={18} strokeWidth={1.5} />
        </button>
      </Activity>
    </div>
  );
}
