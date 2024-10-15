export class User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    isAuthenticated?: boolean;
    constructor(id?: number, name?: string, email?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}