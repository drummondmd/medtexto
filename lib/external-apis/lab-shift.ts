"use server";

import { DataModel } from "./lab-shif-types";
import retirarAcentos from "../helpers/retirarAcentos";

const api_key = process.env.API_KEY_LAB_SHIFT;
const api_url = process.env.API_URL + "/lab-shift";

export async function getOrCreateJob(userName: string) {
  const response = await fetch(api_url + "/jobs?user=" + userName, {
    headers: { "X-API-Key": api_key },
  });
  if (response.status == 200) {
    const json = await response.json();

    return json.job_id;
  } else {
    const createJob = await fetch(api_url + "/create_job?user_name=" + userName, {
      headers: { "X-API-Key": api_key },
      method: "post",
    });
    if (createJob.status == 200) {
      const json = await createJob.json();
      const job_id = json.active_job.id;
      return job_id;
    } else {
      console.error("Erro ao conseguir ou criar job na api");
      return null;
    }
  }
}

export async function getJob(job_id: string, isRestarting: boolean = false) {
  const response = await fetch(api_url + `/${job_id}?restart=${isRestarting}`, {});
  if (response.status == 200) {
    const json = await response.json();
    return json;
  } else {
    console.error("ERRO NO GET JOB", response.status, response);
    return null;
  }
}

export async function postNames(job_id: string, names: string) {
  if (job_id == "" || names == "") {
    return null;
  }

  const normalized_names = names.split(",").map((name) => retirarAcentos(name));
  const payload = { payload: normalized_names.map((name) => ({ cpf: "", name: name })) };

  const response = await fetch(`${api_url}/patient_list/${job_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(payload),
  });
  if (response.status == 200) {
    const json = await response.json();
    return json;
  } else {
    console.error("ERRO NO POST PACIENTS");
    return null;
  }
}

export async function addCpfOnPatient(job_id: string, patient_obj: DataModel, cpf: string) {
  if (patient_obj == null || cpf == "") return null;

  const payload = {
    id: patient_obj.id,
    updated_person: {
      name: patient_obj.patient_name,
      cpf: cpf,
    },
  };

  try {
    const response = await fetch(`${api_url}/patient_list/${job_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify(payload),
    });
    if (response.status == 200) {
      const json = await response.json();
      return json;
    } else {
      console.error("ERRO NO PUT PACIENTS");
      return null;
    }
  } catch (e) {
    console.error("ERRO NO PUT PACIENTS", e);
    return null;
  }
}

export async function deletePatient(
  job_id: string,
  patient_id: string,
  deleteAll: boolean = false
) {
  if (job_id == "" || patient_id == "") return null;

  const payload = {
    id: patient_id,
    updated_person: {
      name: "",
      cpf: "",
    },
  };

  try {
    const response = await fetch(`${api_url}/patient_list/${job_id}?delete_all=${deleteAll}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "delete",
      body: JSON.stringify(payload),
    });
    if (response.status == 200) {
      const json = await response.json();
      return json;
    } else {
      console.error("ERRO NO DELETE PACIENTS");
      return null;
    }
  } catch (e) {
    console.error("ERRO NO DELETE PACIENTS", e);
    return null;
  }
}
