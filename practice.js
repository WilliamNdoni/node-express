// First example
const express = require('express');
const app = express()
const { products } = require('./data.js')

app.get('/',(req,res)=>{
  res.send('<h1>Home page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products',(req,res)=>{
   const newProducts = products.map((product)=>{
    const {id,name,image} = product;
    return {id,name,image }
   })
   res.json(newProducts)
})

app.get('/api/products/:productID',(req,res)=>{
  const {productID} = req.params;
  const singleProduct = products.find((product)=> 
    product.id === Number(productID))
  if(!singleProduct){
    return res.status(404).send('Product does not exist')
  }
  return res.json(singleProduct)
})

app.get('/api/v1/query',(req,res)=>{
  // console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter((product)=>{
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0,Number(limit))
  }
  if(sortedProducts.length <1) {
    // res.status(200).send('no product matched your search')
    return res.status(200).json({success: true, data: []})
  }
  res.status(200).json(sortedProducts)
  console.log(req.query)
  // res.send('Hello Ndoni')
})

app.listen(5000,()=>{
  console.log('Listening to port 5000...')
})

// New example

// added from a different file (app.js)
const express = require('express');
const app = express()
const morgan = require('morgan')
const middleware = require('./middleware')
const authorize = require('./authorize')


// app.use([middleware, authorize])
// app.use(express.static('./public'))
app.use(morgan('tiny'))

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
