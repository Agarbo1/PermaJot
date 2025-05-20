'use strict';

const note = require('../models/note');

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
        content: 'This is a demo note.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Notes";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        title: { [Op.in]: ["Demo Note"] },
      },
    );
  }
};
