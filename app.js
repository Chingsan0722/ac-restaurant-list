// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require body-parser here
const bodyParser = require('body-parser')

// method override
const methodOverride = require('method-override')

// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require mongoose here
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

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json')

// setting template engine here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 載入靜態檔案
app.use(express.static('public'))

// 用app.use 規定每一筆請求都要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// index page
app.get('/', (req, res) => {
  Restaurant.find() // 取出Todo model裡的所有資料(也可在()中寫入指定要找的資料)
    .lean() // 把mongoose的model物件轉換成乾淨的 js資料陣列
    .then(restaurantData => res.render('index', { restaurantData })) // 將資料傳給 index樣板 , { restaurants } 是 { restaurants:restaurants }的縮寫
    .catch(error => console.error(error)) // 錯誤處理
})
// show page & detail page
app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

// edit page
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})
app.post('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const description = req.body.description
  return Restaurant.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = name,
      restaurant.category = category,
      restaurant.image = image,
      restaurant.location = location,
      restaurant.phone = phone,
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// search function
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }

  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      const filterRestaurantData = restaurantData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', { restaurantData: filterRestaurantData, keywords })
    })
    .catch(err => console.log(err))
})
// new restaurant page
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/restaurants', (req, res) => {
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description =req.body.description
//   return Restaurant.create({name, name_en, category, image, location, phone, google_map, rating, description})
//   .then(() => res.redirect('/'))
//   .catch(error => console.log(error))
// })

// delete restaurant
app.post('/restaurants/:restaurantId/delete', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen express server
app.listen(port, () => {
  console.log(`now server begins running on http://localhost:${port}`)
})
