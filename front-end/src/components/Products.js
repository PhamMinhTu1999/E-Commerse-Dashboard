import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Products = ()=>{
    const [products, setProducts] = useState ([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/delete-product/${id}`,{
            method: "delete",
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        alert("Product Deleted");
        getProducts();
    }

    const collectData = async(event)=>{
        let key = event.target.value;
        if(key) {
            let result = await fetch(`http://localhost:5000/search-product/${key}`,{
                headers:{
                    Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            if(result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
        
    }

    return(
        <div className="product-list">
            <h1>Products</h1>
            Search: <input className="inputBox" type="text" placeholder="Search..." onChange={collectData}/>
            <Link to="/add"><button className="appButton" type="button">Add Product</button></Link>
            {
                products.length > 0 ?
                <ul>
                    <li>ID</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Operation</li>
                </ul>
            :<></>}
            {
                products.length > 0 ? products.map((item, index)=>
                <ul key={item._id}>
                    <li>{item._id}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>
                    <Link to={"/update/"+item._id}><button className="updateButton" type="button">Update</button></Link>
                        <button className="deleteButton" type="button" onClick={()=>deleteProduct(item._id)}>Delete</button>
                    </li>
                </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default Products;