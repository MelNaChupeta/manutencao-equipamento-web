export class User {
    id?: number;
    cpf?: string;
    name?: string;
    email?: string;
    celular?: string;
    cep?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    perfil?: string;
    isAuthenticated?: boolean;
    constructor(id: number, cpf:string, name: string, email: string, celular: string, cep: string, endereco: string, bairro: string, cidade: string, estado: string) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.celular = celular;
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }
}