const express = require('express');
const app = express()
const middleware = require('./middleware')

app.use('/api',middleware)

app.get('/',(req,res)=>{
  res.send('Home')
})

app.get('/about',(req,res)=>{
  res.send('About')
})

app.get('/api/products',(req,res)=>{
  res.send('Products')
})

app.get('/api/items',(req,res)=>{
  res.send('Items')
})


app.listen(5000,()=>{
  console.log('Listening to port 5000....')
})