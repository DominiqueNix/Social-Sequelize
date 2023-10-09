const {db, Model, DataTypes} = require("../db/connection.js");

let Profile = db.define("Profile", {
    bio: DataTypes.STRING, 
    profilePicture: DataTypes.STRING, 
    birthday: DataTypes.DATE
});


module.exports = Profile;