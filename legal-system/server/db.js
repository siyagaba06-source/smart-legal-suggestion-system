const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // XAMPP default me blank hota hai
  database: "legal_system"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

module.exports = db;