const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const {evrout} = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v3/app', evrout);


app.listen(port, () => {
    console.log(`server listening on port ${port}!`)
});