import { User } from "./user";
export class funcionario extends User {
  cargo?:string;
  dataNascimento?: string;
  senha?:string;
    constructor(id?: number, name?: string, email?: string) {
      super(id, name, email);
    }
}