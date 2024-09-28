import { User } from "./user";
export class funcionario extends User {
  cargo?:string;
    constructor(id: number, name: string, email: string) {
      super(id, name, email);
    }
}