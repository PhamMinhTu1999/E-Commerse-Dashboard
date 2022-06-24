import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = ()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const validID = new RegExp(/[0-9A-Fa-f]{24}$/);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        console.warn(params.id);
        if (!validID.test(params.id) || (params.id).length != 24) {
            alert("Invalid ID");
            navigate("/products");
        } else {
            getProducts();
        }
    },[]);
    const getProducts = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const collectData = async()=>{
        if(name && price && category && company) {
            let result = await fetch(`http://localhost:5000/update-product/${params.id}`,{
                method: "put",
                body: JSON.stringify({name, price, category, company}),
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
            <h1>Update Product</h1>
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
            <button className="appButton" type="button" onClick={collectData}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;