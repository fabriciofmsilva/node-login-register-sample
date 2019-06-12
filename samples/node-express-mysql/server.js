const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const connection = mysql.createConnection({
	host : process.env.MYSQL_HOST || '0.0.0.0',
	user : 'root',
	password : 'root',
	database : 'nodelogin'
});

connection.connect();

connection.query('SELECT * FROM accounts', function (error, results, fields) {
  if (error) throw error;
  console.log('accounts: ', results);
});

// connection.end();

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  console.log('/');
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(request, response) {
	const username = request.body.username;
  const password = request.body.password;
  console.log('/auth');
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      console.log(results);
      if (results && results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
    });
	} else {
		response.send('Please enter Username and Password!');
		response.end();
  }
});

app.get('/home', function(request, response) {
  console.log('/home');
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(8080);
