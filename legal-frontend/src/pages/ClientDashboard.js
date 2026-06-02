import React, { useState } from "react";

function ClientDashboard() {

const [form, setForm] = useState({
title:"",
category:"",
description:"",
city:"",
address:"",
budget:""
});

const [suggestedLawyers,setSuggestedLawyers] = useState([]);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

// 🔥 SEND REQUEST
const sendRequest = async(lawyer)=>{

await fetch("http://localhost:5000/send-request",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
case_id: lawyer.caseId,
lawyer_id: lawyer.id
})
});

// 🔥 UI UPDATE (disable button)
setSuggestedLawyers(prev =>
  prev.map(l =>
    l.id === lawyer.id ? { ...l, requested: true } : l
  )
);

alert("✅ Request Sent Successfully!");

window.location.href = "/";
};

// 🔥 SUBMIT CASE + FIND LAWYERS
const handleSubmit = async(e)=>{
e.preventDefault();

try{

// 1️⃣ SUBMIT CASE
const caseResponse = await fetch("http://localhost:5000/submit-case",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:form.title,
category:form.category,
description:form.description,
city:form.city,
address:form.address,
budget:form.budget,
client_email:"demo@gmail.com"
})
});

const caseData = await caseResponse.json();

alert("✅ Case Submitted Successfully!");

// 🔥 SAVE CASE ID
const newCaseId = caseData.insertId;
localStorage.setItem("case_id", newCaseId);

// 2️⃣ FIND LAWYERS
const response = await fetch("http://localhost:5000/find-lawyers",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
category:form.category,
city:form.city,
budget:form.budget
})
});

const lawyers = await response.json();

// 🔥 attach caseId + requested flag
const updatedLawyers = lawyers.map(l => ({
...l,
caseId: newCaseId,
requested: false
}));

setSuggestedLawyers(updatedLawyers);

}catch(error){
console.log(error);
alert("Something went wrong ❌");
}

};

return(

<div style={page}>

<div style={card}>

<h1 style={title}>Submit Your Legal Case</h1>

<form onSubmit={handleSubmit} style={formBox}>

<input name="title" placeholder="Case Title" onChange={handleChange} style={input}/>

<select name="category" onChange={handleChange} style={input}>
<option value="">Select Case Category</option>
<option>Criminal Law</option>
<option>Civil Law</option>
<option>Family Law</option>
<option>Property Dispute</option>
<option>Divorce Case</option>
<option>Corporate Law</option>
<option>Cyber Crime</option>
<option>Consumer Court</option>
<option>Tax Law</option>
<option>Labour Law</option>
</select>

<textarea name="description" placeholder="Case Description" onChange={handleChange} style={textarea}/>

<input name="city" placeholder="Your City" onChange={handleChange} style={input}/>

<textarea name="address" placeholder="Full Address" onChange={handleChange} style={textarea}/>

<input type="number" name="budget" placeholder="Your Budget (₹)" onChange={handleChange} style={input}/>

<button type="submit" style={button}>Submit Case</button>

</form>

<div style={{marginTop:"30px"}}>

<h2 style={{color:"#a855f7"}}>Suggested Lawyers</h2>

{suggestedLawyers.length === 0 && (
<p style={{color:"gray"}}>No lawyers found yet</p>
)}

{suggestedLawyers.map((lawyer)=>(
<div style={lawyerCard} key={lawyer.id}>

<h3 style={{color:"#a855f7"}}>{lawyer.name}</h3>

<p>Specialization: {lawyer.specialization}</p>
<p>City: {lawyer.city}</p>
<p>Experience: {lawyer.experience} years</p>
<p>Total Cases: {lawyer.total_cases}</p>
<p>Cases Won: {lawyer.cases_won}</p>
<p>Charge: ₹{lawyer.charges}</p>

<p style={{opacity:"0.8"}}>
{lawyer.about}
</p>

{/*  BUTTON LOGIC */}
{lawyer.requested ? (
  <button style={{...button, background:"gray"}} disabled>
    Request Sent
  </button>
) : (
  <button 
    onClick={()=>sendRequest(lawyer)} 
    style={button}
  >
    Send Request
  </button>
)}

</div>
))}

</div>

</div>

</div>

)

}

const page={
background:"linear-gradient(135deg,#2b0a3d,#000000)",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
};

const card={
background:"#0f0f0f",
padding:"40px",
borderRadius:"12px",
width:"500px",
boxShadow:"0 0 30px rgba(140,0,255,0.4)"
};

const title={
color:"#a855f7",
marginBottom:"25px",
textAlign:"center"
};

const formBox={
display:"flex",
flexDirection:"column",
gap:"15px"
};

const input={
padding:"12px",
borderRadius:"6px",
border:"1px solid #333",
background:"#1a1a1a",
color:"white"
};

const textarea={
padding:"12px",
borderRadius:"6px",
border:"1px solid #333",
background:"#1a1a1a",
color:"white",
height:"90px"
};

const button={
padding:"12px",
background:"#9333ea",
border:"none",
color:"white",
borderRadius:"6px",
cursor:"pointer",
fontSize:"16px",
marginTop:"10px"
};

const lawyerCard={
background:"#0f0f0f",
padding:"20px",
marginTop:"15px",
borderRadius:"10px",
border:"1px solid #9333ea",
color:"white"
};

export default ClientDashboard;