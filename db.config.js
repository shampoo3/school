// const mariadb = require('mariadb');
import mariadb from 'mariadb';
// console.log('---------');
// const pool = mariadb.createPool({
//      host: 'mydb.com', 
//      user:'myUser', 
//      password: 'myPassword',
//      connectionLimit: 5
// });
// async function asyncFunction() {
//   let conn;
//   try {
// 	conn = await pool.getConnection();
//     console.log(conn);
// 	const rows = await conn.query("SELECT * from 'academic_year'");
// 	console.log(rows); //[ {val: 1}, meta: ... ]
// 	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	console.log("res"); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }
// asyncFunction();

// Create a connection pool

let db = {
    host: 'localhost', 
    port: 3306,
    user: 'dev', 
    password: 'dev@123',
    database: 'SCHOOL'
  }
var pool = 
  mariadb.createPool(db);
 
// Expose a method to establish connection with MariaDB SkySQL
// module.exports = ({
//   pool: pool
// });

export default {
    pool: pool
}