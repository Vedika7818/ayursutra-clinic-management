const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ayurcare",
  port: 3306   
});


db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = db;
