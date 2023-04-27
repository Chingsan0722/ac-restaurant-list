const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show page & detail page
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(error => console.log(error))
})
router.put('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  return Restaurant.findById(restaurantId)
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
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
