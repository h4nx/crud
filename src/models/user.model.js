const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    dni: String,
    phone: String,
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);