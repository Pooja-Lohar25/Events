const express = require('express');
const app = express();
const port = 3000;

const {events} = require('./routes');

app.use(express.json());

app.use('/api/v3/app', events);


app.listen(port, () => {
    console.log(`server listening on port ${port}!`)
});