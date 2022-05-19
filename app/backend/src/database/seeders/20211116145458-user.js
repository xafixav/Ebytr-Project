module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        user: 'xafixav',
        password: 'secret_xafixav',
      },
      {
        user: 'Guest',
        password: 'secret_guest',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};