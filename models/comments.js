const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user", 
            key: "id"
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "post",
            key: "id",
        }
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;

// comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created