const config = require('./config');
const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
const port = process.env.PORT || config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/jobs', require('./routes/api/jobs'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/student', require('./routes/api/student'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/job-detail.html/:id', function(req, res) {
//     res.json({ message: "Hello " + req.params.id });
//     res.redirect('jobdetail/' + req.params.id);
// });


app.use('./public/js', express.static(__dirname + '/public/js'));

app.listen(port);