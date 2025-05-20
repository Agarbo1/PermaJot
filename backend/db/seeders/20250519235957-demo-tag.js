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
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Personal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Urgent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Important',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Tags";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['Work', 'Personal', 'Urgent', 'Important'] },
      },
    );
  }
};
