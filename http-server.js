const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const config = require('config');
const auth = require('./middleware/logger');
const morgan = require('morgan');
const app = express();
const Joi = require('joi');
const courses = require('./routes/courses');
const home = require('./routes/home');

//Set the routes
app.use('/api/courses', courses);
app.use('/', home);

//Set the View Engine
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') == 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//DB work
dbDebugger('Connected to the database...');

app.use(function(req, res, next) {
    console.log('Logging....');
    next();
});

app.use(function (req, res, next) {
    console.log('Calling from OAuth');
    next();
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));