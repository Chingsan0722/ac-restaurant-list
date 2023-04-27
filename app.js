// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const routes = require('./routes')

// 對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')

// setting template engine here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true
}))

// setting static files 載入靜態檔案
app.use(express.static('public'))

// 用app.use 讓每一筆請求都透過body-parser與methodOverride進行前置處理
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)

//掛載flash製作警示訊息
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// start and listen express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
