const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstName: String,
    lastName: String,
    qualification: String,
    experience: Number,
    gender: String,
    subject: String,
    address: String,
    email: String,
    phone: Number,
    additionalInfo: String
})
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;