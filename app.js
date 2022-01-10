const express = require("express");
const app = express()
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
const path = require("path");
const methodOverride = require('method-override')
const Student = require('./models/student.js')
const Teacher = require('./models/teacher.js')
    // var bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/levelUp', {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Databse connected");
});

app.get('/home', (req, res) => {
    res.render("home");
})


//students route

app.get('/students/new', (req, res) => {
    res.render('students/new');
})

app.post('/students', async(req, res) => {
    const student = new Student(req.body.student);
    await student.save();
    res.redirect(`/students/${student._id}`);
})

app.get('/students/:id', async(req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.render('students/edit', { student })
})










app.get('/teachers/new', (req, res) => {
    res.render("teachers/new");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/books', (req, res) => {
    res.render("books");
})

app.get('/pyq', (req, res) => {
    res.render("pyq");
})

app.get('/tutions', (req, res) => {
    res.render("tutions");
})

// app.get('/tea', (req, res) => {
//     res.render("tea");
// })


app.get('/already', (req, res) => {
    res.render("already");
})

app.get('/askq', (req, res) => {
    res.render("askq");
})

app.get('/newhome', (req, res) => {
    res.render("newhome");
})

app.get('/edit', (req, res) => {
    res.render("edit");
})

app.get('/editstudent', (req, res) => {
    res.render("editstudent");
})

app.get('/priti', (req, res) => {
    res.render("priti");
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})