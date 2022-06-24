import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{
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
        let result = await fetch("http://localhost:5000/login",{
            method: "post",
            body: JSON.stringify({email, password}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        if(result.auth) {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            window.location.reload();
            navigate("/");
        } else {
            alert("Incorrect email or password");
        }
    }
    return(
        <div>
            <h1>Login</h1>
            <table className="tableCenter">
                <tbody>
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
            <button className="appButton" type="button" onClick={collectData}>Login</button>
        </div>
    )
}

export default Login;