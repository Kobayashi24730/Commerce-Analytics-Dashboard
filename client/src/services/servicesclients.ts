import {API_URL} from "../api/apiClient";
import { Clients,addUser,editUser,delUser } from "../types";

export async function getClients(): Promise<Clients[]> {
  const response = await fetch(`${API_URL}/clients`);

  if(!response.ok){
    throw new Error("Erro ao coletar data dos clients!!");
  }

  const data = await response.json();
  return data?.clients ?? [];
}

export async function addClient( usuario: addUser ) {
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {'Content-Type': 'application/json', },
    body: JSON.stringify( usuario )
  });

  if(!response.ok){
    throw new Error("Erro ao cadastrar o client");
  }

  const data = await response.json();
  return data?.data ?? [];
}


export async function editarClient( usuario: editUser ) {
  const response = await fetch(`${API_URL}/clients/${usuario.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify( usuario )
  });

  if(!response.ok){
    throw new Error("Erro ao editar o client");
  }

  const data = await response.json()
  return data?.data ?? [];
}


export async function excluirClient( usuario: delUser ){
  const response = await fetch(`${API_URL}/clients/${usuario.id}`, {
    method: "DELETE"
  });

  if(!response.ok){
    throw new Error("Erro ao excluir client");
  }

  const data = await response.json();
  return data?.data ?? [];
}
