const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: false, minlength: 6},
    jobs: [{type: mongoose.Types.ObjectId, required: false, ref: 'Job'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);