//require packages used in the project
const express = require('express')
const app = express()
const port = 3000

//require body-parser here
const bodyParser = require('body-parser')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//require mongoose here
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('Public'))

//routes setting
app.get('/', (req, res) => {
  //past restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(restaurant => restaurant.id.toString().toLowerCase() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurants })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//start and listen express server
app.listen(port, () => {
  console.log(`now server begins running on http://localhost:${port}`)
})