import { User } from "../models/user";
export class Client extends User {
    constructor(id: number, name: string, email: string) {
      super(id, name, email);
    }
}