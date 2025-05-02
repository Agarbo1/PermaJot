'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NoteTag.belongsTo(models.Note, { foreignKey: 'noteId' });
      NoteTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
    }
  }
  NoteTag.init(
    {
      noteId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Notes',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
      },
    },
    {
      sequelize, 
      modelName: 'NoteTag',
    }
  );
  return NoteTag;
};
