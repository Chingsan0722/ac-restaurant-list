const Restaurant = require('../restaurant') // 載入 restaurant model
const User = require('../user')
const seedRestaurant = require('../restaurant.json').results // 載入 種子餐廳
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }]
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash =>
          User.create({
            email: user.email,
            password: hash
          }))
        .then((user) => {
          const userId = user._id
          const json = seedRestaurant.results
          return Promise.all(
            Array.from(
            seedRestaurant.slice(index * 3, index * 3 + 3),
            (restaurant) => Restaurant.create({ ...restaurant, userId })
            )
          )
        })
        .catch(err => console.log(err))
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})



// 問題：一次要產生兩個bcrypt，生成兩個使用者，再各自連結三筆資料...
// 不要用foreach 研究完promise all 再寫
// let i = 0
  // while (i < seedRestaurant.results.length) {
  //   Restaurant.create(
  //     {
  //       name: `${seedRestaurant.results[i].name}`,
  //       name_en: `${seedRestaurant.results[i].name_en}`,
  //       category: `${seedRestaurant.results[i].category}`,
  //       image: `${seedRestaurant.results[i].image}`,
  //       location: `${seedRestaurant.results[i].location}`,
  //       phone: `${seedRestaurant.results[i].phone}`,
  //       google_map: `${seedRestaurant.results[i].google_map}`,
  //       rating: `${seedRestaurant.results[i].rating}`,
  //       description: `${seedRestaurant.results[i].description}`
  //     }
  //   )
  //   i++
  // }