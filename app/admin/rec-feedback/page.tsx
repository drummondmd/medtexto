import { pool } from "@/lib/databases/db-config";

import FeedbackInterativeComponent from "./clientCom";

export type FeedbackType = {
  id: number;
  user_id: string;
  recurso: string;
  input_data: string;
  output_data: string;
  is_correct: null | boolean;
  feedback_notes: null | string;
  created_at: Date;
};

export default async function Page() {
  const queryResult = await pool.query(
    "SELECT * FROM receituario_feedback WHERE NOT is_correct IS TRUE"
  );
  let feedbacks = null;
  if (queryResult.rowCount > 0) {
    feedbacks = queryResult.rows;
  }

  return (
    <div>
      {feedbacks === null && <p> Nenhum dado registrado até o momento</p>}
      {feedbacks != null && <FeedbackInterativeComponent itens={feedbacks} />}
    </div>
  );
}
