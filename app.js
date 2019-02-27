const faker = require('faker');
const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'join_us'
  });

// let q = 'SELECT CURTIME() as time, CURDATE() as date, NOW() as now';
// let q = 'SELECT COUNT(*) AS total FROM users';

// connection.query(q, function(error, results, fields){
// 	if(error) throw error;
// 	console.log('count', results[0].total)
	// console.log('The solution is: ', results[0])
	// console.log(results[0].time)
	// console.log(results[0].date)
	// console.log(results[0].now)
// });

// INSERTING DATA
// let person = {
// 					email: faker.internet.email(),
// 					created_at: faker.date.past()
// 				};

// connection.query('INSERT INTO users SET ?', person, function(err, result){
// 	if(err) throw err;
// 	console.log(result)
// });

// INSERT LOTS OF DATA
let data = [];

for (let i = 0; i < 500; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	])
}

console.log(data)


let q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function(err, result){
	console.log(err);
	console.log(result);
})

connection.end();


// function generateAddress() {
// 	console.log(faker.address.city());
// 	console.log(faker.address.streetAddress());
// 	console.log(faker.address.state());
// }

// generateAddress();