"use client";

export default function ReceituarioPadrao({ selected, changeText }) {
  return (
    <>
      <div>
        <textarea
          maxLength="45000"
          style={{ height: "260px" }}
          className="form-control mt-1"
          value={selected.conteudo}
          onChange={(e) => changeText(e)}
        ></textarea>
      </div>
    </>
  );
}
