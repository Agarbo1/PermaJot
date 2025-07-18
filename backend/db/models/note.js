'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.Notebook, {
        foreignKey: 'notebookId',
      });
      Note.belongsToMany(models.Tag, {
        through: models.NoteTag,
        foreignKey: 'noteId',
        otherKey: 'tagId',
      });
    }
  }
  Note.init(
    {
      notebookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Notebooks',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Note',
    }
  );
  return Note;
};
