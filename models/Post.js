const {db, Model, DataTypes} = require("../db/connection.js");

let Post = db.define("Post", {
    title: DataTypes.STRING, 
    body: DataTypes.STRING, 
    createAt: DataTypes.DATE
});


module.exports = Post;