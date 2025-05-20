'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Tasks';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        description: 'Demo Task',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Tasks";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        description: { [Op.in]: ["Demo Task"] },
      },
    );
  }
};
