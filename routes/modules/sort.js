const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// index page
router.get('/nameasc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId}) 
    .lean()
    .sort({ name: 'asc' })
    .then(restaurantData => res.render('index', { restaurantData })) 
    .catch(error => console.error(error))
})

router.get('/namedesc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId}) 
    .lean() 
    .sort({ name: 'desc' })
    .then(restaurantData => res.render('index', { restaurantData })) 
    .catch(error => console.error(error)) 
})

router.get('/catasc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId}) 
    .lean()
    .sort({ category: 'asc' })
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.error(error))
})

router.get('/locasc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({userId}) 
    .lean()
    .sort({ location: 'asc' })
    .then(restaurantData => res.render('index', { restaurantData })) 
    .catch(error => console.error(error))
})
module.exports = router
