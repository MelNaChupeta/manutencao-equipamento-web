export class User {
    id?: number;
    nome?: string;
    email?: string;
    role?: string;
    isAuthenticated?: boolean;
    constructor(id?: number, nome?: string, email?: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}