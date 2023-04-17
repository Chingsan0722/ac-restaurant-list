// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const methodOverride = require('method-override')

// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

const routes = require('./routes')

// 對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')

// setting template engine here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 載入靜態檔案
app.use(express.static('public'))

// 用app.use 讓每一筆請求都透過body-parser與methodOverride進行前置處理
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// start and listen express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
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
