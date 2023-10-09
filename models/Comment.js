const {db, Model, DataTypes} = require("../db/connection.js");

let Comment = db.define("Comment", {
    body: DataTypes.STRING, 
    createdAt: DataTypes.DATE
});


module.exports = Comment;