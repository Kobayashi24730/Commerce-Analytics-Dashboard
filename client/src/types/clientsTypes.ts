export interface Clients {
  id: number,
  nome: string,
  email: string, 
  cargo: string
}

export interface addUser {
  nome: string,
  senha: string,
  email: string,
  cargo: string
}

export interface editUser {
  id: number,
  nome: string,
  senha: string,
  email: string,
  cargo: string
}

export interface delUser {
  id: number
}