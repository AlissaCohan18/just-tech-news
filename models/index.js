// Import the User & Post model
const User = require("./User");
const Post = require("./Post");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Export an object with them as the properties
module.exports = { User, Post };
