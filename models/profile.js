// Creating the Profile model
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
    // photo: DataTypes.BLOB
  });

  // Create association between Post and User
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Profile;
};
