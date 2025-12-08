import ActionButton from "@/components/ui/actionBtn";

import StatusBar from "./statusBar";

type Props = {
  variant: "yellow" | "blue";
  onClick: any;
  btnTitle: string;
  status: {
    statusCode: "success" | "error" | "info";
    statusMessage: string;
  };
  disableBtn: boolean;
};

export default function ActionWStatus({ variant, onClick, btnTitle, status, disableBtn }: Props) {
  return (
    <div className="flex flex-row my-2 ">
      <div className="w-1/2">
        <StatusBar statusCode={status.statusCode} statusMessage={status.statusMessage} />
      </div>
      <div className="w-1/2">
        <ActionButton variant={variant} onClick={onClick} title={btnTitle} disable={disableBtn} />
      </div>
    </div>
  );
}
