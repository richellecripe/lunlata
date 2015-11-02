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
// var routes = require('./routes/routes.js')


// connect to mongoose 
mongoose.connect('mongodb://localhost/lunlata')



// --- Create Express App Object --- \\
var app = express()

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUniinitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// --- Serve Static Files --- \\
app.use( express.static(__dirname + '/public') )

// --- Routes --- \\

app.get( '/', function(req, res){
	res.sendFile('/html/index.html', {root : './public'})
})

app.get( '/test', passportConfig.ensureAuthAjax, function(req, res){
	res.send({ success: 'success!'})
})

app.post( '/login', function(req, res){
	console.log(req.body)
})

app.post( '/register', function(req,res){
	console.log(req.body)
})

app.get( '/leaderboard', userCtrl.findLeaders)

// --- Create Port & Listen for Connections --- \\
var port = 3000


app.listen(port, function(){
	console.log('Server running on port: ' + port)
})