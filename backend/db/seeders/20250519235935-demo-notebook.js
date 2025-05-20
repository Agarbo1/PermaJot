'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Notebooks';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        title: 'Demo Notebook',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Notebooks";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ["Demo Notebook"] },
      },
    );
  }
};
