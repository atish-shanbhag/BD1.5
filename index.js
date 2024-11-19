const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

function welcomeStatement () {
  return "Welcome to our service!"
}

app.get("/welcome", (req, res)=>{
  res.send(welcomeStatement());
})

function getUserName(username){
  return `Hello, ${username}!`
}

app.get("/greet", (req, res) => {
  let username = req.query.username;
  res.send(getUserName(username));
});

function checkPasswordChar(password){
  let length = password.length;
  console.log(length)
  if(length > 15){
    return "Password is strong"
  }
  return "Password is weak"
}

app.get("/check-password", (req, res) => {
  let password = req.query.password;
  res.send(checkPasswordChar(password));
});

function sumFunction(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

app.get("/sum", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  let result = sumFunction(num1, num2);
  res.send(result.toString());
});

function subscribeFunc(username, isSubscribed){
  console.log('LINE 53', username, isSubscribed)
  if(isSubscribed === "true"){
    return `${username} is subscribed`;
  }else{
    return `${username} is not subscribed`;
  }
}

app.get("/subscription-status", (req, res) => {
  let username = req.query.username;
  let isSubscribed = req.query.isSubscribed;

  res.send(subscribeFunc(username, isSubscribed));
});

function checkDiscountedPrice(price, discount){
  return price - (price * discount) / 100;
}

app.get("/discounted-price", (req,res) =>{
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let result = checkDiscountedPrice(price,discount);
  res.send(result.toString());
});

function greetingFunc(age, gender, name){
  return `Hello ${name}! You are a ${age} year old ${gender}`
}
app.get("/personalized-greeting", (req, res) =>{
  let age = req.query.age;
  let gender = req.query.gender;
  let name = req.query.name;

  res.send(greetingFunc(age, gender, name))
})


function checkFinalPrice(price, discount, tax){
  let discountedPrice = price - (price * (discount / 100));
  let finalPrice = discountedPrice + (discountedPrice *(tax/100)) 
  return finalPrice;
}

app.get("/final-price", (req,res) =>{
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  let result = checkFinalPrice(price,discount,tax);
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
