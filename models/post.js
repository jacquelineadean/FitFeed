// Creating the Post model
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    // Activity cannot be null and must be a valid URL
    activity: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   isURL: {
      //     msg: "Activity must be a URL with http or https protocol.",
      //     protocols: ["http", "https"],
      //     requireProtocol: true
      //   }
      // }
    },
    // Title cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Body is optional
    body: {
      type: DataTypes.TEXT
    }
  });

  // Create association between Post and User
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
