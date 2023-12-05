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
            model: "User", 
            key: "id"
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Post",
            key: "id",
        }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;

// comment is saved and the post is updated to display the Comment, the comment creator’s username, and the date created