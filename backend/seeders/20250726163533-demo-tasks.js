'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      { name: 'Comprar leche', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pagar facturas', completed: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Estudiar Node.js', completed: false, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};