const express = require('express')
const router = express.Router()

// search function
router.get('/search', (req, res) => {
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

module.exports = router
