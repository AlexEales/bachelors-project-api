const dialogflow = require('dialogflow');
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

console.log(`Env variables: Port = ${process.env.PORT} Host = ${process.env.DB_HOST} Db = ${process.env.DB_NAME} 
    User = ${process.env.DB_USER} Pass = ${process.env.DB_PASS}`);

app.get('/trusts', function (req, res) {
    datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
        res.send(values);
    });
});

app.post('/dialogflow', async function (req, res) {
    console.log(req.body);
    const intent = req.body.queryResult.intent.displayName;
    const entities = req.body.queryResult.parameters;
    res.send({
        fulfillmentText: await knowledge.query(intent, entities)
    });
});

app.post('/message', async function (req, res) {
    console.log(req.body);
    const message = req.body.text;
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en'
            }
        }
    };
    const responses = await sessionClient.detectIntent(request);
    console.log(responses);
    const result = responses[0].queryResult;
    res.send({
        text: result.fulfillmentMessages[0].text.text[0]
    });
});

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000.'));
