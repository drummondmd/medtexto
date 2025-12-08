"use client";

import { useState } from "react";

import CreateNota from "@/components/modal/create-nota";

import SelectorGroup from "../selectorGroup/selector-group";

type Props = {
  resource: "evolucoes" | "receituarios";
  userId: string;
  arrayOfSelectors: Array<{ id: string; label: string }>;
  selectedIds: string[];
  handleForm: any;
  onClick: (e) => void;
  onCopy?: (e) => void;
  onDelete?: (e) => void;
};

export default function ItemsToolbar({
  resource,
  selectedIds,
  userId,
  arrayOfSelectors,
  onCopy,
  onClick,
  onDelete,
  handleForm,
}: Props) {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <CreateNota
          cadernos={undefined}
          recurso={resource}
          isCaderno={false}
          handlerForm={handleForm}
          userId={userId}
          user={userId}
          //boolean={openModal}
          close={() => setModal(false)}
        />
      )}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-1/6 flex items-center justify-center">
          <button type="button" className="btn" onClick={() => setModal(true)}>
            <div className="text-center flex lg:flex-col gap-2 lg:gap-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span>Novo</span>
            </div>
          </button>
        </div>
        <div className="lg:w-5/6">
          <SelectorGroup
            arrayOfSelectors={arrayOfSelectors}
            canMutateData={true}
            onClick={onClick}
            selectedIds={selectedIds}
            multiple={false}
            onCopy={onCopy}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
}
