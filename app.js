const express = require("express");
const app = express()
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
const path = require("path");
const methodOverride = require('method-override')
const Student = require('./models/student.js')
const Teacher = require('./models/teacher.js')
const catchAsync = require('./utils/catchAsync');
const expressError = require('./utils/expressError');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require("passport-local")

const { validateTeacher, validateStudent } = require('./middleware')

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

const sessionConfig = {
    name: 'session',
    secret: 'this is my secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

passport.use(new localStrategy(Teacher.authenticate()));
passport.serializeUser(Teacher.serializeUser());
passport.deserializeUser(Teacher.deserializeUser());


app.get('/home', (req, res) => {
    res.render("home");
})

//students route
app.get('/students/new', (req, res) => {
    res.render('students/new');
})

app.get('/students/newhome', (req, res) => {
    res.render('students/newhome');
})

app.get('/students/edit', (req, res) => {
    res.render('students/edit');
})

app.post('/students', validateStudent, catchAsync(async (req, res) => {
    const student = new Student(req.body.student);
    await student.save();
    // res.redirect(`/students/${student._id}`);
    res.redirect('students/newhome');
}))

app.get('/students/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.render('students/edit', { student })
}))


//teacher route
app.get('/teachers/main', (req, res) => {
    res.render("teachers/main");
})

app.get('/teachers/new', (req, res) => {
    res.render("teachers/new");
})

app.get('/teachers/edit', (req, res) => {
    res.render('teachers/edit');
})

app.post('/teachers', validateTeacher, catchAsync(async (req, res) => {
    const teacher = new Teacher(req.body.teacher);
    await teacher.save();
    // res.redirect(`/students/${student._id}`);
    res.redirect('/teachers/main');
}))

app.get('/teachers/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    res.render('teachers/edit', { teacher })
}))


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


app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something went wrong!"
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})