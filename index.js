const Joi = require('joi');
const express = require('express');
const app = express();
const survey = require('./assets/survey')
app.use(express.json());

// get survey
let surveyID;
let surveyType;

app.get('/api/v1/survey', (req, res) => {
    surveyID = survey.id;
    surveyType = survey.type;
    res.send(survey);
});

// post survey

app.post('/api/v1/survey/:id/answers', (req, res) => {


    const request = {
        type: req.body.type,
        attributes: {
            answers: [
                {
                    questionId: req.body.attributes.answers[0].questionId,
                    answer: req.body.attributes.answers[0].answer
                },
                {
                    questionId: req.body.attributes.answers[0].questionId,
                    answer: req.body.attributes.answers[0].answer
                }
            ]
        }
    }

    const response = {
        type: 'answersSurvey',
        id: Math.floor(Math.random() * 1000) * 3,
        attributes: {
            answers: [
                {
                    questionId: req.body.attributes.answers[0].questionId,
                    answer: req.body.attributes.answers[0].answer
                },
                {
                    questionId: req.body.attributes.answers[1].questionId,
                    answer: req.body.attributes.answers[1].answer
                }
            ]
        },
        relationships: {
            survey: {
                data: {
                    type: surveyType,
                    id: surveyID
                }
            }
        }
    };

    // Validation schema

    let schema = Joi.object().keys({
        answers: Joi.array().items(
            Joi.object({
                questionId: Joi.string().required(),
                answer: Joi.string().required(),
            }),
            Joi.object({
                questionId: Joi.string().required(),
                answer: Joi.string().required(),
            })
        ).required(),
    });

    const result = schema.validate(request.attributes);

    if (result.error) {
        res.status(400).send({ "errors": [result.error.message] });
        return;
    }

    res.send(response);
});





const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}`));