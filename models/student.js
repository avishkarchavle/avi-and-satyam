const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    class: Number,
    gender: String,
    subject: String,
    address: String,
    email: String,
    phone: String,
    additionalInfo: String,

});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;