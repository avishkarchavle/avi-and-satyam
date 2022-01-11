const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const teacherSchema = new Schema({
    firstName: String,
    lastName: String,
    qualification: String,
    experience: String,
    gender: String,
    subject: String,
    address: String,
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    additionalInfo: String
})


teacherSchema.plugin(passportLocalMongoose);
teacherSchema.plugin(findOrCreate)
const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;