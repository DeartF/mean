const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/project')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '6mb'}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(session({
	resave: true,
	secret: 'secret',
	saveUninitialized: true,
	key: 'key',
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/api', require('./server/routes'))

app.get('*', (req, res, next) => {
	res.redirect('/#' + req.originalUrl);
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Server listening on port 3000')
})