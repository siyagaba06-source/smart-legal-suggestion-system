import React,{useEffect,useState} from "react";

function LawyerDashboard(){

const [cases,setCases] = useState([]);

//  GET LOGGED-IN LAWYER ID
const lawyerId = localStorage.getItem("lawyer_id");

//  FETCH REQUESTED CASES
useEffect(()=>{

if(lawyerId){
fetch(`http://localhost:5000/lawyer-requests/${lawyerId}`)
.then(res=>res.json())
.then(data=>setCases(data));
}

},[lawyerId]);


//  ACCEPT / REJECT FUNCTION
const updateStatus = async(case_id,status)=>{

await fetch("http://localhost:5000/update-status",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
case_id:case_id,
lawyer_id:lawyerId,
status:status
})
});

alert(status);

// refresh page
window.location.reload();

};


return(

<div style={page}>

<h1 style={{color:"#a855f7",marginBottom:"30px"}}>Requested Cases</h1>

{cases.length === 0 && (
<p>No Requests Yet</p>
)}

{cases
.filter(c => c.status !== "Rejected")
.map((c)=>(
<div key={c.id} style={card}>

<h3>{c.title}</h3>
<p>{c.category}</p>
<p>{c.city}</p>
<p>Budget: ₹{c.budget}</p>
<p>Status: {c.status}</p>

{/* 🔥 BUTTONS */}
{c.status === "Accepted" ? (
  <p style={{color:"lightgreen", fontWeight:"bold"}}>
    ✅ Accepted Case
  </p>
) : (
  <>
    <button onClick={()=>updateStatus(c.id,"Accepted")} style={btn}>
      Accept
    </button>

    <button 
      onClick={()=>updateStatus(c.id,"Rejected")} 
      style={{...btn,background:"red"}}
    >
      Reject
    </button>
  </>
)}

</div>
))}

</div>

)

}

const page={
background:"#0f0f0f",
minHeight:"100vh",
padding:"40px",
color:"white"
}


const card={
background:"#1a1a1a",
padding:"20px",
marginBottom:"15px",
borderRadius:"10px",
border:"1px solid #9333ea"
}

const btn={
marginTop:"10px",
marginRight:"10px",
padding:"10px",
background:"#9333ea",
border:"none",
color:"white",
cursor:"pointer"
}

export default LawyerDashboard;