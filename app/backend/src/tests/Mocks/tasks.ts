import IUser from "../../interfaces/IUser";

export const allTasksMock = [
  {
    task: 'Terminar o projeto da Blitz',
    userId: 1,
    status: 'Em andamento',
  },
  {
    task: 'Estilizar o projeto',
    userId: 1,
    status: 'Pendente',
  },
  {
    task: 'Refatorar possiveis redundancias',
    userId: 1,
    status: 'Pendente',
  },
  {
    task: 'Modelar o banco de dados',
    userId: 1,
    status: 'Pronto',
  },
  {
    task: 'Reclamar mentalmente sobre o tanto de projeto que tem pra fazer',
    userId: 1,
    status: 'Em andamento',
  },
]

export const adminCorrect: IUser = {
  id: 1,
  user: "xafixav",
  password: "secret_xafixav"
};