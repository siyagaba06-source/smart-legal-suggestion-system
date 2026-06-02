import React, { useEffect, useState } from "react";

function CaseRoom(){

const [lawyer,setLawyer] = useState(null);

useEffect(()=>{

const caseId = localStorage.getItem("case_id");

if(!caseId) return;

fetch(`http://localhost:5000/accepted-lawyer/${caseId}`)
.then(res=>res.json())
.then(data=>{
if(data.length > 0){
setLawyer(data[0]);
}
});

},[]);

return(

<div style={page}>

<h1 style={title}>Case Room</h1>

{!lawyer ? (

<p style={{color:"gray"}}>
No lawyer accepted yet ❌
</p>

) : (

<div>

{/* CONTACT BOX */}
<div style={contactBox}>

<h2 style={{color:"#22c55e"}}>Your Lawyer</h2>

<h3>{lawyer.name}</h3>
<p>Email: {lawyer.email}</p>
<p>Phone: {lawyer.phone}</p>

</div>

{/* FULL PROFILE */}
<div style={card}>

<p>Specialization: {lawyer.specialization}</p>
<p>City: {lawyer.city}</p>
<p>Experience: {lawyer.experience} years</p>
<p>Total Cases: {lawyer.total_cases}</p>
<p>Cases Won: {lawyer.cases_won}</p>
<p>Charge: ₹{lawyer.charges}</p>

</div>

</div>

)}

</div>

)

}

const page={
background:"#0f0f0f",
minHeight:"100vh",
padding:"40px",
color:"white"
};

const title={
color:"#a855f7",
marginBottom:"30px"
};

const card={
background:"#1a1a1a",
padding:"20px",
borderRadius:"10px",
border:"1px solid #9333ea"
};

const contactBox={
background:"#111",
padding:"20px",
borderRadius:"10px",
border:"2px solid #22c55e",
marginBottom:"15px"
};

export default CaseRoom;