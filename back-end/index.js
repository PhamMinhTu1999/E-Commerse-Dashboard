const express = require('express');
const cors = require("cors");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
require("./db/config");

const jwtkey = "e-commerse"
const app = express();

app.use(express.json());
app.use(cors());

app.post("/check", async(req, resp)=>{
    let user = await User.findOne(req.body);
    if(user) {
        resp.send(user);
    } else {
        resp.send({"result":"No User Found"});
    }
});
app.post("/register", async(req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err) {
            resp.send({"result":"Something went wrong, please try again later"});
        } else {
            resp.send({result,auth:token});
        }
    });
});
app.post("/login", async(req, resp)=>{
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if(user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err) {
                    resp.send({"result":"Something went wrong, please try again later"});
                } else {
                    resp.send({user,auth:token});
                }
            });
        } else {
            resp.send({"result":"No User Found"});
        }
    } else {
        resp.send({"result":"No User Found"});
    }
});

app.post("/add-product", verifyToken, async(req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});
app.get("/products", verifyToken, async(req, resp)=>{
    const products = await Product.find();
    if(products.length > 0) {
        resp.send(products);
    } else {
        resp.send({"result": "No Product found"});
    }
});
app.delete("/delete-product/:id", verifyToken, async(req, resp)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});
app.get("/product/:id", verifyToken, async(req, resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result) {
        resp.send(result);
    } else {
        resp.send({"result": "No Product found"});
    }
});
app.put("/update-product/:id", verifyToken, async(req, resp)=>{
    let result = await Product.updateOne({_id:req.params.id},{$set: req.body})
    resp.send(result);
});
app.get("/search-product/:key", verifyToken, async(req, resp)=>{
    let result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key,$options:'i'}},
            {price: {$regex: req.params.key,$options:'i'}},
            {category: {$regex: req.params.key,$options:'i'}},
            {company: {$regex: req.params.key,$options:'i'}}
        ]
    });
    resp.send(result);
});

function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtkey, (err, token)=>{
            if(err) {
                resp.status(401).send({"result":"please provide a valid token"});
            } else {
                next();
            }
        });
    }else {
    resp.status(403).send({"result":"please provide a token"});
    }
}

app.listen(5000);