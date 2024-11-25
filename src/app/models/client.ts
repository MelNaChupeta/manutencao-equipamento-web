import { User } from "../models/user";
export class Client extends User {
  cep?:string;
  endereco?:string;
  cidade?:string;
  estado?:string
  bairro?:string;
  celular?:string;
  cpf?:string;
  constructor(id: number, nome: string, email: string,) {
    super(id, nome, email);
  }
}