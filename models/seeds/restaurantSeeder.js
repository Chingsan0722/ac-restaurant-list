const Restaurant = require('../restaurant')
const User = require('../user')
const seedRestaurant = require('../restaurant.json').results
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
