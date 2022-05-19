module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'tasks',
      [
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
        {
          task: 'Testar e dar feedback sobre a aplicação',
          userId: 2,
          status: 'Em andamento',
        },
        {
          task: 'Elogiar o cuidado do Gustavo com os detalhes do projeto xD',
          userId: 2,
          status: 'Em andamento',
        }
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
