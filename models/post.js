const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// define/create our Post model
class Post extends Model {
  // static keyword to indicate upvote method is based on Post model,
  // not an instance method like with the User model
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
//use raw MySQL aggregate function query for count of votes & return under `vote_count`
sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
'vote_count'
]
],
include: [
{
model: models.Comment,
attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
include: {
  model: models.User,
  attributes: ['username']
}
}
]
});
});
}
}

// create fields/columns for Post model
Post.init(
{
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true
},
title: {
type: DataTypes.STRING,
allowNull: false
},
post_url: {
type: DataTypes.STRING,
allowNull: false,
validate: {
isURL: true
}
},
user_id: {
type: DataTypes.INTEGER,
references: {
model: 'user',
key: 'id'
}
}
},
{
sequelize,
freezeTableName: true,
underscored: true,
modelName: 'post'
}
);

module.exports = Post;