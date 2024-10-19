import { User } from "../models/user";
export class Client extends User {
  cep?:string;
  endereco?:string;
  cidade?:string;
  bairro?:string;
  uf?:string;
  celular?:string;
  cpf?:string;
  constructor(id: number, name: string, email: string,) {
    super(id, name, email);
  }
}