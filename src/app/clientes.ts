export interface Cliente {
  cpf: string;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
}

export const clientes: Cliente[] = [
  {
    cpf: '123.456.789-10',
    nome: 'João das Neves',
    email: 'joao.neves@email.com',
    endereco: '69318-169 Rua Cezar Nogueira Júnior, Boa Vista, RR',
    telefone: '(95) 98808-2196',
  },
  {
    cpf: '338.030.661-40',
    nome: 'José Saramago',
    email: 'jose.saramago@email.com',
    endereco: '71693-202 Rua 2, Brasília, DF',
    telefone: '(61) 97916-5416',
  },
  {
    cpf: '484.654.912-75',
    nome: "Joana d'Arc",
    email: 'joana.darc@email.com',
    endereco: '49090-080 Rua Guilhermino José Barbosa, Aracaju, SE',
    telefone: '(79) 98000-7053',
  },
  {
    cpf: '778.771.499-99',
    nome: 'Joaquina Machado',
    email: 'joaquina.machado@email.com',
    endereco: '84072-346 Rua Paulo Beckert, Ponta Grossa, PR',
    telefone: '(44) 99261-5088',
  },
];
