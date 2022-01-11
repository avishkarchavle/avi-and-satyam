const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    class: Number,
    gender: String,
    subject: String,
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    additionalInfo: String
});


studentSchema.plugin(passportLocalMongoose);
studentSchema.plugin(findOrCreate)
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;