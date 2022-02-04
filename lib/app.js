const express = require('express');

const app = express();
const path = require('path');

// Built in middleware
app.use(express.json());

// App routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/greeks', require('./controllers/greeks'));
app.use('/api/v1/norses', require('./controllers/norses'));
app.use('/api/v1/egyptians', require('./controllers/egyptians'));
app.use('/api/v1/persians', require('./controllers/persians'));
app.use('/api/v1/japaneses', require('./controllers/japaneses'));


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
