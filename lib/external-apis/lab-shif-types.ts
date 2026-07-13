export type StatusCode = "pending" | "completed" | "finished" | "aborted" | "empty";

export interface ActiveJob {
  id: string;
  global_status: StatusCode;
  created_at: string;
  updated_at: string;
  finished_at: string | null;
  data: DataModel[];
}

export interface DataModel {
  id: string;
  patient_name: string;
  cpf: string;
  status: StatusCode;
  records: number;
  method: "cpf" | "name";
  reqs: ReqModel[];
  patient_progress: number;
}

export interface ReqModel {
  name: string;
  age: string;
  recebido: string;
  previsao: string;
  first_result: string;
  has_flag: string;
  num_solicitacao: string;
  requisicao_id: string;
  unidade_cod: string;
  setor_cod: string;
  detalhado: DetalhadoReq[];
}

export interface DetalhadoReq {
  exame: string;
  status: string;
}
