'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Tasks'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        description: 'Make sure to complete this task',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        description: 'Check this sample task',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        description: 'This task is complete',
        isCompleted: true,
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
        userId: { [Op.in]: [1] }
      }
    );
  }
};
