const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const seedRestaurant = require('../../restaurant.json') //載入 種子餐廳
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  let i = 0
  while (i < seedRestaurant.results.length) {
    Restaurant.create(
      { name: `${seedRestaurant.results[i].name}`,
        name_en: `${seedRestaurant.results[i].name_en}`,
        category: `${seedRestaurant.results[i].category}`,
        image: `${seedRestaurant.results[i].image}`,
        location: `${seedRestaurant.results[i].location}`,
        phone: `${seedRestaurant.results[i].phone}`,
        google_map: `${seedRestaurant.results[i].google_map}`,
        rating: `${seedRestaurant.results[i].rating}`,
        description: `${seedRestaurant.results[i].description}`
       },
    )
    i++
  }
  console.log('done')
})