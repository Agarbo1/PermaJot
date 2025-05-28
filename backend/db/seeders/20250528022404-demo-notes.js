'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Notes';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        notebookId: 1,
        title: 'Demo Note',
        content: 'Sample note 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notebookId: 1,
        title: 'Sample Note',
        content: 'Sample note 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notebookId: 2,
        title: 'Specimen Note',
        content: 'Sample note 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notebookId: 2,
        title: 'Additional Note',
        content: 'Sample note 4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notebookId: 3,
        title: 'Extra Note',
        content: 'Sample note 5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        notebookId: 3,
        title: 'Final Note',
        content: 'Sample note 6',
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
        notebookId: { [Op.in]: [1, 2, 3] }, // Adjust this condition based on your needs
      },
    );
  }
};
