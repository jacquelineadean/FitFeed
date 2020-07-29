// Creating the Post model
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        // Activity cannot be null and must be a valid URL
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: {
                    msg: "Activity must be a URL with http or https protocol.",
                    protocols: ["http", "https"],
                    require_protocol: true
                }
            }
        },
        // Body is optional
        body: {
            type: DataTypes.TEXT
        }
    });

    // Create association between Post and User
    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
}