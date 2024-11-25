import { User } from "./user";
export class Funcionario extends User {
  cargo?:string;
  dtNascimento?: string;
  senha?:string;
    constructor(id?: number, name?: string, email?: string) {
      super(id, name, email);
    }
}