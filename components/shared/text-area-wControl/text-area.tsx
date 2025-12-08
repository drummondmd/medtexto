import { Ref } from "react";

type Props = {
  textState: string;
  textAreaRef: Ref<HTMLTextAreaElement>;
  onChangeInput: (e) => void;
  variant: "small" | "large";
};

export default function TextArea({ textState, textAreaRef, onChangeInput, variant }: Props) {
  const baseClass =
    " box-border text-base leading-6 w-full border border-gray-300 rounded-lg bg-white shadow-none resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const small = "p-1 min-h-[150px]";
  const lager = "min-h-[350px] p-3";

  return (
    <div className={variant === "small" ? "my-1" : "my-3"}>
      <textarea
        ref={textAreaRef}
        spellCheck={true}
        name="temp"
        maxLength={45000}
        placeholder="Digite ou cole seu texto aqui..."
        className={`${baseClass} ${variant === "small" ? small : lager}`}
        value={textState}
        onChange={onChangeInput}
      ></textarea>
    </div>
  );
}
