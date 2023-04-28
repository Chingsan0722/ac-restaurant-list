const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// index page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId})
    .lean()
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.error(error))
})

module.exports = router
