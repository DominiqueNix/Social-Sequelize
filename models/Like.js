const {db, Model, DataTypes} = require("../db/connection.js");
let Like = db.define("Like", {
    reactionType: DataTypes.STRING, 
    createdAt: DataTypes.DATE
});

module.exports = Like;