const express = require('express')
const app = express()
const students = require('./students.json')
const grades = require('./grades.json')
const bodyParser = require('body-parser')

var nextID = 0

for (const student of students) {
    if (Number(student.id) >= nextID) {
        nextID = student.id + 1
    }
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
    if (req.query.students) {
        let results = []
        for (const student of students) {
            if (student.firstName === req.query.students || student.lastName === req.query.students) {
                results.push(student)
            }
        }
        res.send(results)
    } else {
        res.send(students)
    }
})

app.get('/students/:studentId', (req, res) => {
    for (const student of students) {
        if (Number(student.studentId) === Number(req.params.studentId)) {
            res.send(student)
            break
        }
    }
})

app.get('/grades/:studentId', (req, res) => {
    let results = []
    for (const grade of grades) {
        if (Number(grade.studentId) === Number(req.params.studentId)) {
            results.push(grade.points)
        }
    }
    res.send(results)
})

app.post('/grades', (req, res) => {
    if (req.body.studentId && req.body.grade) {
        newGrade = {
            studentId: req.body.studentId,
            points: req.body.grade
        }
        grades.push(newGrade)
        res.status(201).send("Success")
    } else {
        res.status(400).send("Bad data")
    }
})

app.post('/register', (req, res) => {
    if (req.body.username && req.body.email) {
        newUser = {
            username: req.body.username,
            email: req.body.email
        }
        console.log(newUser)
        res.status(201).send("Success")
    } else {
        res.status(400).send("Bad data")
    }
})

const port = 3000
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))