module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'xafixav',
        password: 'secret_xafixav',
      },
      {
        username: 'Guest',
        password: 'secret_guest',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
