"use client";

import { useRouter } from "next/navigation";

import { delteUserHandle } from "@/lib/handler-action";

export default function FormButton({
  clickFunction,
  anotherClass,
  escrito,
  user_id,
  username,
  disabled,
}) {
  const route = useRouter();

  function handleClick(clickFunction, user_id) {
    if (clickFunction === "deleteUser") {
      delteUserHandle(user_id);
    }
    ///fazer reset de pass depois, trocar senha somente de usuarios com email confirmados
    if (clickFunction === "resetePass") {
      route.push(`/${username}/auth/reset-password`);
    }
  }

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => handleClick(clickFunction, user_id)}
        className={`btn m-1 ${anotherClass}`}
      >
        {escrito}
      </button>
    </>
  );
}
