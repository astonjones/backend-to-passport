const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

//Need to replace this with user sign on
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 3
    },
    password: { type: String, unique: false, required: false}
}, {
    timestamps: true,
});

//Define Schema methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

//Define Hooks for pre-saving
userSchema.pre('save', function(next) {
    if(!this.password) {
        console.log('models/user.model.js =========No Password Provided');
        next()
    } else {
        console.log('models/user.js hashPassword in pre save')

        this.password = this.hashPassword(this.password)
        next()
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;