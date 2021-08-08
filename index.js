const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{
    id: 1,
    name: 'course 1'
},
{
    id: 2,
    name: 'course 2'
},
{
    id: 3,
    name: 'course 3'
},
];

app.get('/', (req, res) => {
    res.send('hello worldssss');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
    }
    res.send(course);
});


// POST
app.post('/api/courses', (req, res) => {

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    courses.push(course);
    res.send(course);
});


// PUT 
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

// DELETE

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
        return;
    }

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));