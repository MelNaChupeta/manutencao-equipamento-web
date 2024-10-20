export interface Funcionario {
    nome: string;
    email: string;
    dataNascimento: Date;
  }

export const funcionarios: Funcionario[] = [
    {
        nome: "Maria",
        email: "maria.lima@email.com",
        dataNascimento: new Date(
            'Wed Oct 31 1980 09:01:12 GMT-0300 (Brasilia Standard Time)'
          )
    },
    {
        nome: "Mário",
        email: "mario.napoli@email.com",
        dataNascimento: new Date(
            'Wed Jul 07 1981 09:01:12 GMT-0300 (Brasilia Standard Time)'
          )
    }
]