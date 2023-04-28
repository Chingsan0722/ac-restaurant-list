const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create page
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, rating, location, google_map, phone, description, image } = req.body
  Restaurant.create(
    {
      name,
      name_en,
      category,
      rating,
      location,
      google_map,
      phone,
      description,
      image,
      userId
    })
  return res.redirect('/')
})

// show page & detail page
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id
  Restaurant.findOne({restaurantId, userId})
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id
  Restaurant.findOne({ restaurantId, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})
router.put('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id
  const { name, name_en, category, rating, location, google_map, phone, description, image } = req.body
  return Restaurant.findOne({ restaurantId, userId })
    .then(restaurant => {
      restaurant.name = name,
      restaurant.name_en = name_en,
      restaurant.category = category,
      restaurant.rating = rating,
      restaurant.location = location,
      restaurant.google_map = google_map,
      restaurant.phone = phone,
      restaurant.description = description,
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// delete restaurant
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.id
  return Restaurant.findOne({ restaurantId, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
