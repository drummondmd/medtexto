"use client";

import { useState } from "react";

import { adminChangedFb } from "@/actions/admin-actions/rec-fb-action";

import { FeedbackType } from "./page";

export default function FeedbackInterativeComponent({ itens }: { itens: Array<FeedbackType> }) {
  const ItemComponent = ({ item }: { item: FeedbackType }) => {
    const [state, setState] = useState({
      isCorrect: item.is_correct,
      notes: item.feedback_notes ?? "",
    });

    const onChangeSelect = async (e, item) => {
      let value = e.target.value === "null" ? null : e.target.value;
      if (value === "false") {
        value = false;
      }
      if (value === "true") {
        value = true;
      }

      setState({ ...state, isCorrect: value });

      const modifiedItem = item as FeedbackType;
      modifiedItem.is_correct = value;
      modifiedItem.feedback_notes = state.notes;
      await adminChangedFb(modifiedItem);
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 my-3" key={item.id}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Id (User Id)</p>
            <p className="text-sm font-medium text-gray-800">
              {item.id} ({item.user_id})
            </p>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500">Recurso</p>
            <p className="text-sm text-gray-800">{item.recurso}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">isCorrect</p>
            <select
              onChange={(e) => onChangeSelect(e, item)}
              value={state.isCorrect != null ? state.isCorrect.toString() : "null"}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={"null"}>...</option>
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </select>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500">Notes</p>
            <input
              onChange={(e) => setState({ ...state, notes: e.target.value })}
              value={state.notes}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">Input</p>
            <textarea
              readOnly
              className="w-full bg-gray-50 p-3 border border-gray-200 rounded-md"
              value={item.input_data}
              rows={6}
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Output</p>
            <textarea
              readOnly
              className="w-full bg-gray-50 p-3 border border-gray-200 rounded-md"
              value={item.output_data}
              rows={6}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <p>Tabela</p>
      {itens.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
