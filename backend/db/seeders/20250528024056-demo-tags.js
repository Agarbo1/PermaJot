'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Tags';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        name: 'Important',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Urgent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Optional',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['Important', 'Urgent', 'Optional'] }
      }
    );
  }
};
