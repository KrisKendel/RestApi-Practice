const Joi = require('joi');
const express = require('express');
const app = express();
const books = require('./assets/books')
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

// GET ALL
app.get('/api/books', (req, res) => {
    res.send(books);
});

// GET BY ID

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send(`The course with ID ${req.params.id} was not found`);
    }
    res.send(book);
});


// POST
app.post('/api/books', (req, res) => {

    const book = {
        id: books.length + 1,
        title: req.body.title,
        publishDate: req.body.publishDate,
        shortDescription: req.body.shortDescription,
        authors: req.body.shortDescription,
        availability: req.body.shortDescription
    };

    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        publishDate: Joi.required(),
        shortDescription: Joi.string().required(),
        authors: Joi.required(),
        availability: Joi.string().required()
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    books.push(book);
    res.send(book);
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