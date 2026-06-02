import React from "react";
import { useNavigate } from "react-router-dom";

function ClientHome(){

const navigate = useNavigate();

return(

<div style={page}>

<h1 style={title}>Client Dashboard</h1>

<div style={box}>

<button style={btn} onClick={()=>navigate("/client-dashboard")}>
Lawyer Suggestions
</button>

<button style={btn} onClick={()=>navigate("/case-room")}>
Case Room
</button>

</div>

</div>

)

}

const page={
background:"linear-gradient(135deg,#2b0a3d,#000000)",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
color:"white"
};

const title={
marginBottom:"30px",
color:"#a855f7"
};

const box={
display:"flex",
flexDirection:"column",
gap:"20px",
width:"250px"
};

const btn={
padding:"15px",
background:"#9333ea",
border:"none",
borderRadius:"8px",
color:"white",
cursor:"pointer",
fontSize:"16px"
};

export default ClientHome;