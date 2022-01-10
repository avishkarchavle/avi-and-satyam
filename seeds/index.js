const mongoose = require('mongoose')
const Student = require('../models/student.js')

mongoose.connect('mongodb://localhost:27017/levelUp', {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Databse connected");
});


const seedDB = async() => {
    await Student.deleteMany({});
    const student = new Student({
        firstName: "satyam",
        lastName: "bindroo",
        class: 334,
        gender: "m",
        subject: "pcm",
        address: "govond , kslfls kds ",
        email: "aviskar@gmail.com",
        phone: 234932749,
        additionalInfo: "lsjflsjfljdsf  slkfjklds lsjf k",

    })
    await student.save();
}


seedDB().then(() => {

    mongoose.connection.close()
})