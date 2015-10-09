// --- app.js is the scaffolding for the App ---\\


// --- Require --- \\
var express = require('express')
var bodyParser = require('body-parser')


// --- Create Express App Object --- \\
var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// --- Serve Static Files --- \\
app.use( express.static(__dirname + '/public') )

// --- Routes --- \\

app.get( '/', function(req, res){
	res.sendFile('/html/index.html', {root : './public'})
})

// --- Create Port & Listen for Connections --- \\
var port = 80


app.listen(port, function(){
	console.log('Server running on port: ' + port)
})