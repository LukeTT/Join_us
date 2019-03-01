let express = require('express');
let app = express();
let mysql = require('mysql');
let ejs = require('ejs');
let bodyParser = require('body-parser');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'join_us'
});

app.set('view engine', 'ejs', 'ejs')
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	// count users in BD
	let q = 'SELECT COUNT(*) AS count FROM users';

	connection.query(q, function (err, results) {
		if (err) throw err;

		let count = results[0].count;
		// res.send(`We have ${count} users in our db`)
		res.render('home', {
			data: count
		});
	})
})


//// trying to ensure no duplicates are passed
app.post('/register', async function (req, res) {

	const isRegistered = (email) => {
		// console.log(email)
		return new Promise((resolve) => {
			connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
				if (err) return rejects(error);
				if (res && res[0]) {
					// console.log('users exists', res)
					return resolve(true)
				}
				resolve(false)
			})
		})
	}

	const createUser = (email) => {
		return new Promise((resolve) => {
			connection.query('INSERT INTO users SET ?', person, function (err, result) {
				// if(err) throw err;
				if (err) return reject(err);
				res.redirect('/')
				resolve(result)
			})
		})
	}

	let person = {
		email: req.body.email
	};
	try {
		const exists = await isRegistered(person.email)
		if (exists) {throw new Error('user data already exists')} else {
			const result = await createUser(person.email)
		}
		
	} catch (err) {
		console.log(err)
		res.redirect('/404')
	}
});

// app.post('/register', async function(req, res){
// 	let person = {
// 			email: req.body.email
// 	};
// 	connection.query('INSERT INTO users SET ?', person, function(err, result){
// 		if(err) throw err;
// 		res.redirect('/')
// 	})		

// });




// app.post('/register', function(req, res){
// 	let person = {
// 			email: req.body.email
// 	};

// 	connection.query('INSERT INTO users SET ?', person, function(err, result){
// 		if(err) throw err;
// 		res.redirect('/')
// 	})		

// });

app.get('/joke', function (req, res) {
	let joke = 'haha'
	// res.send(joke)
	res.render('home', {
		data: null
	});
})


app.get('/404', function (req, res) {
	res.send('data duplication');
})

app.get("/random_num", function (req, res) {
	let num = Math.floor(Math.random() * (10 - 0)) + 0;
	res.send(num.toString())
})

app.listen(8080, function () {
	console.log('Server running on 8080');
});