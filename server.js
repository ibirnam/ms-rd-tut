require('dotenv').config();
const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser()); // Add this after you initialize express.

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// The following line must appear AFTER const app = express() and before your routes!
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Set db
require('./data/reddit-db')

// Require the models and controllers
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})