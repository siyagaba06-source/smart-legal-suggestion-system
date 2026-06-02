const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

/* ===========================
   ROOT
=========================== */
app.get("/", (req, res) => {
  res.send("Legal System Backend Running 🚀");
});

/* ===========================
   CLIENT REGISTER
=========================== */
app.post("/register-client", (req, res) => {

  const { name, email, password } = req.body;

  const sql = "INSERT INTO clients (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Client Registration Failed ❌");
    } else {
      res.json({ message: "Client Registered Successfully ✅" });
    }
  });

});

/* ===========================
   LAWYER REGISTER
=========================== */
app.post("/register-lawyer", (req, res) => {

const { 
name,email,password,phone,
specialization,city,charges,
experience,total_cases,cases_won,about
} = req.body;

const sql = `
INSERT INTO lawyers
(name,email,password,phone,specialization,city,charges,experience,total_cases,cases_won,about)
VALUES (?,?,?,?,?,?,?,?,?,?,?)
`;

db.query(sql,
[name,email,password,phone,specialization,city,charges,experience,total_cases,cases_won,about],
(err)=>{

if(err){
console.log(err);
res.status(500).send("Database Error");
}
else{
res.json({message:"Lawyer Registered Successfully"});
}

});

});

/* ===========================
   CLIENT LOGIN
=========================== */
app.post("/login-client", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM clients WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    if (err) return res.status(500).send("Server error");

    if (result.length > 0) {
      res.json({ message: "Login Successful", user: result[0] });
    } else {
      res.status(401).send("Invalid Credentials");
    }

  });

});

/* ===========================
   LAWYER LOGIN
=========================== */
app.post("/login-lawyer", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM lawyers WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    if (err) return res.status(500).send("Server error");

    if (result.length > 0) {
      res.json({ message: "Login Successful", user: result[0] });
    } else {
      res.status(401).send("Invalid Credentials");
    }

  });

});

/* ===========================
   SUBMIT CASE
=========================== */
app.post("/submit-case", (req, res) => {

  const { title, category, description, city, address, budget, client_email } = req.body;

  const sql = `
  INSERT INTO cases
  (title, category, description, city, address, budget, client_email)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, category, description, city, address, budget, client_email], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Database Error");
    } else {

      res.json({ 
        message: "Case Submitted Successfully",
        insertId: result.insertId
      });

    }

  });

});

/* ===========================
   FIND LAWYERS
=========================== */
app.post("/find-lawyers", (req, res) => {

  const { category, city, budget } = req.body;

  const sql = `
  SELECT * FROM lawyers
  WHERE specialization = ?
  AND city = ?
  AND charges <= ?
  `;

  db.query(sql, [category, city, budget], (err, result) => {

    if (err) return res.status(500).send("Database Error");

    res.json(result);

  });

});

/* ===========================
   SEND REQUEST
=========================== */
app.post("/send-request",(req,res)=>{

const {case_id,lawyer_id} = req.body;

const sql = `
INSERT INTO case_applications (case_id,lawyer_id,status,requested_by)
VALUES (?,?,'Pending','client')
`;

db.query(sql,[case_id,lawyer_id],(err)=>{

if(err){
console.log(err);
res.status(500).send("Request Failed");
}
else{
res.json({message:"Request Sent"});
}

});

});

/* ===========================
   LAWYER REQUESTS
=========================== */
app.get("/lawyer-requests/:lawyer_id",(req,res)=>{

const lawyer_id = req.params.lawyer_id;

const sql = `
SELECT cases.*, case_applications.status
FROM case_applications
JOIN cases ON case_applications.case_id = cases.id
WHERE case_applications.lawyer_id = ?
`;

db.query(sql,[lawyer_id],(err,result)=>{

if(err){
console.log(err);
res.status(500).send("Error");
}
else{
res.json(result);
}

});

});

/* ===========================
   ACCEPT / REJECT
=========================== */
app.post("/update-status",(req,res)=>{

const {case_id,lawyer_id,status} = req.body;

const sql = `
UPDATE case_applications
SET status = ?
WHERE case_id = ? AND lawyer_id = ?
`;

db.query(sql,[status,case_id,lawyer_id],(err)=>{

if(err){
console.log(err);
res.status(500).send("Error");
}
else{
res.json({message:"Updated"});
}

});

});

/* ===========================
   GET ACCEPTED LAWYER
=========================== */
app.get("/accepted-lawyer/:case_id",(req,res)=>{

const case_id = req.params.case_id;

const sql = `
SELECT l.*
FROM case_applications ca
JOIN lawyers l ON ca.lawyer_id = l.id
WHERE ca.case_id = ?
AND ca.status = 'Accepted'
LIMIT 1
`;

db.query(sql,[case_id],(err,result)=>{

if(err){
console.log(err);
res.status(500).send("Error");
}
else{
res.json(result);
}

});

});

/* ===========================
   START SERVER
=========================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});