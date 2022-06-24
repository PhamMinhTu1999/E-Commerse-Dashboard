import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    },[]);
    const collectData = async()=>{
        if(name && email && password) {
            let check = await fetch("http://localhost:5000/check",{
                method: "post",
                body: JSON.stringify({email}),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            check = await check.json();
            if(check.name) {
                alert("User already existed");
            } else {
                let result = await fetch("http://localhost:5000/register",{
                    method: "post",
                    body: JSON.stringify({name, email, password}),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                result = await result.json();
                alert("Register Success");
                navigate("/login");
            }
        } else {
            alert("All fields are required");
        }
    }
    return(
        <div>
            <h1>Register</h1>
            <table className="tableCenter">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Name..." value={name} onChange={(e)=>setName(e.target.value)}/></th>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Email..." value={email} onChange={(e)=>setEmail(e.target.value)}/></th>
                    </tr>
                    <tr>
                        <th>Password:</th>
                        <th><input className="inputBox" type="password" placeholder="Enter Password..." value={password} onChange={(e)=>setPassword(e.target.value)}/></th>
                    </tr>
                </tbody>
            </table>
            <button className="appButton" type="button" onClick={collectData}>Register</button>
        </div>
    )
}

export default Register;