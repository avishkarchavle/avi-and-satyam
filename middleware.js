const Student = require('./models/student');
const Teacher = require('./models/teacher');
const expressError = require('./utils/expressError');
const { studentSchema, teacherSchema } = require('./schemas');


module.exports.validateTeacher = (req, res, next) => {
    const { error } = teacherSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    } else {
        next()
    }
}