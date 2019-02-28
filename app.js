let express = require('express');
let app = express();
let mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'join_us'
  });

app.get('/', function(req, res){
	// count users in BD
	let q = 'SELECT COUNT(*) AS count FROM users';
	
	connection.query(q, function(err, results){
		if(err) throw err;
		let count = results[0].count;
		res.send(`We have ${count} users in our db`)
	})
})

app.get('/joke', function(req, res){
	let joke = 'haha'
	res.send(joke)
})

app.get("/random_num", function(req, res){
	let num = Math.floor(Math.random()*(10 - 0))+0;
	res.send(num.toString())
})

app.listen(8080, function(){
	console.log('Server running on 8080');
});