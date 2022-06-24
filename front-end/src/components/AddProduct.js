import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = ()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const navigate = useNavigate();
    const collectData = async()=>{
        const userID = JSON.parse(localStorage.getItem("user"))._id;
        if(name && price && category && company) {
            let result = await fetch("http://localhost:5000/add-product",{
                method: "post",
                body: JSON.stringify({name, price, category, company, userID}),
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            navigate("/products");
        } else {
            alert("All fields are required");
        }
    }
    return(
        <div>
            <h1>Add Product</h1>
            <table className="tableCenter">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Name..." value={name} onChange={(e)=>setName(e.target.value)}/></th>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Price..." value={price} onChange={(e)=>setPrice(e.target.value)}/></th>
                    </tr>
                    <tr>
                        <th>Category:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Category..." value={category} onChange={(e)=>setCategory(e.target.value)}/></th>
                    </tr>
                    <tr>
                        <th>Company:</th>
                        <th><input className="inputBox" type="text" placeholder="Enter Company..." value={company} onChange={(e)=>setCompany(e.target.value)}/></th>
                    </tr>
                </tbody>
            </table>
            <button className="appButton" type="button" onClick={collectData}>Add Product</button>
        </div>
    )
}

export default AddProduct;