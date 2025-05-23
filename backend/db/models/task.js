'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });

    }
  }
  Task.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID is required',
          },
          notEmpty: {
            msg: 'User ID cannot be empty',
          },
        },
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
