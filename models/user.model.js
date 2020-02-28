const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Need to replace this with user sign on
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;