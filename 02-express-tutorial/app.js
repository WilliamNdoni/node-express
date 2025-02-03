const express = require('express');
const app = express();
let { people } = require('./data')
// Static assets
app.use(express.static('./methods-public'))
// Parse form data 
app.use(express.urlencoded({extended: false}))

app.get('/api',(req,res)=>{
  res.status(200).json({success: true, data: people})
})

app.post('/login',(req,res)=>{
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide a name')
})

app.listen(5000,()=>{
  console.log('Server is listening on port 5000....')
})