const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 搜尋功能
router.get('/', (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  const userId = req.user._id
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  return Restaurant
    .find({ userId })
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

module.exports = router
