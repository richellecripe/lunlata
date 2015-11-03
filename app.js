// --- app.js is the scaffolding for the App ---\\


// --- Require --- \\
var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var passport = require('passport')
var passportConfig = require('./passport.js')
var User = require('./auth/authModel/user.js')
var userCtrl = require('./controllers/userCtrl.js')
var authCtrl = require('./controllers/authCtrl.js')
// var routes = require('./routes/routes.js')


// connect to mongoose 
mongoose.connect('mongodb://localhost/lunlata')



// --- Create Express App Object --- \\
var app = express()

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// --- Serve Static Files --- \\
app.use( express.static(__dirname + '/public') )



// --- Routes --- \\
app.get( '/', function(req, res){
	console.log(req.user)
	res.sendFile('/html/index.html', {root : './public'})
})

app.post( '/login', authCtrl.processLogin)
app.post( '/register', authCtrl.processSignup)
app.get( '/logout', authCtrl.logout)
app.get( '/leaderboard', userCtrl.findLeaders)
app.post( '/getscore', userCtrl.getScore)
app.post( '/setscore', userCtrl.setScore)
  
app.get('/api/me', function(req, res){
	console.log('hi', req.user)
	res.send(req.user)
})


// --- Create Port & Listen for Connections --- \\
var port = 3000


app.listen(port, function(){
	console.log('Server running on port: ' + port)
})