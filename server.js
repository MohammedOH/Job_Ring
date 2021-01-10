const config = require('./config');
const express = require('express');
const dbConn = require('./db');

const app = express();
const port = process.env.PORT || config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/jobs', require('./routes/api/jobs'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/student', require('./routes/api/student'));

app.listen(port);
