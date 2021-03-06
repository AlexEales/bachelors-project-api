const dialogflow = require('dialogflow').v2beta1;
const datastore = require('./datastore');
const knowledge = require('./knowledge');
const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const projectId = process.env.DIALOGFLOW_ID;
const sessionId = uuid.v4();
const sessionClient = new dialogflow.SessionsClient({
    credentials: JSON.parse(process.env.DIALOGFLOW_KEY)
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const knowbase = new dialogflow.KnowledgeBasesClient();
const knowbasePath = knowbase.knowledgeBasePath(projectId, 'MTU1MjQ2MjAzOTkwODA4OTg1NjA');

console.log(`Env variables: Port = ${process.env.PORT} Host = ${process.env.DB_HOST} Db = ${process.env.DB_NAME} 
    User = ${process.env.DB_USER} Pass = ${process.env.DB_PASS}`);

app.get('/trusts', function (req, res) {
    datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
        res.send(values);
    });
});

app.post('/dialogflow', async function (req, res) {
    console.log('Dialogflow:');
    console.log(req.body);
    const intent = req.body.queryResult.intent.displayName;
    const entities = req.body.queryResult.parameters;
    console.log(req.body.queryResult.fulfillmentText);
    if (req.body.queryResult.fulfillmentText !== undefined) {
        res.send({
            fulfillmentText: req.body.queryResult.fulfillmentText
        });
    } else {
        res.send({
            fulfillmentText: await knowledge.query(intent, entities)
        });
    }
});

app.post('/message', async function (req, res) {
    console.log('Message:');
    console.log(req.body);
    const message = req.body.text;
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en'
            }
        },
        queryParams: {
            knowledgeBaseNames: [knowbasePath]
        }
    };
    const responses = await sessionClient.detectIntent(request);
    console.log('Responses:');
    console.log(responses);
    const result = responses[0].queryResult;
    if (result.knowledgeAnswers !== null && result.knowledgeAnswers.answers) {
        res.send({
            text: result.knowledgeAnswers.answers[0].answer
        });
    } else {
        res.send({
            text: result.fulfillmentMessages[0].text.text[0]
        });
    }
});

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000.'));
