const Joi = require('joi');
const express = require('express');
const app = express();
const books = require('./assets/books')
app.use(express.json());

// GET ALL
app.get('/api/books', (req, res) => {
    res.send(books);
});

// GET BY ID

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send(`The book with ID ${req.params.id} was not found`);
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

    // Validation schema
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
app.put('/api/books/:id', (req, res) => {

    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send(`The book with ID ${req.params.id} was not found`);
    }

    const schema = Joi.object({
        title: Joi.string(),
        publishDate: Joi.string(),
        shortDescription: Joi.string(),
        authors: Joi.string(),
        availability: Joi.string(),
        userID: Joi.number(),
        id: Joi.number(),
        rentedFrom: Joi.string(),
        rentedTo: Joi.string(),
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    if (req.body.title) {
        book.title = req.body.title;
    }

    if (req.body.publishDate) {
        book.publishDate = req.body.publishDate;
    }

    if (req.body.shortDescription) {
        book.shortDescription = req.body.shortDescription;
    }

    if (req.body.authors) {
        book.authors = req.body.authors;
    }

    if (req.body.availability) {
        book.availability = req.body.availability;
    }

    if (req.body.userID) {
        book.userID = req.body.userID;
    }

    if (req.body.rentedFrom) {
        book.rentedFrom = req.body.rentedFrom;
    }

    if (req.body.rentedTo) {
        book.rentedTo = req.body.rentedTo;
    }
    res.send(book);
});

// DELETE

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send(`The book with ID ${req.params.id} was not found`);
        return;
    }

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(`The book with ID ${req.params.id} is sucessfully deleted`);
});




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));