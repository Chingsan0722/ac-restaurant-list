const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// index page
router.get('/nameasc', (req, res) => {
  console.log(req)
  Restaurant.find() // 取出Todo model裡的所有資料(也可在()中寫入指定要找的資料)
    .lean() // 把mongoose的model物件轉換成乾淨的 js資料陣列
    .sort({ name: 'asc' })
    .then(restaurantData => res.render('index', { restaurantData })) // 將資料傳給 index樣板 , { restaurants } 是 { restaurants:restaurants }的縮寫

    .catch(error => console.error(error)) // 錯誤處理
})

router.get('/namedesc', (req, res) => {
  if (Restaurant) {
    Restaurant.find() // 取出Todo model裡的所有資料(也可在()中寫入指定要找的資料)
      .lean() // 把mongoose的model物件轉換成乾淨的 js資料陣列
      .sort({ name: 'desc' })
      .then(restaurantData => res.render('index', { restaurantData })) // 將資料傳給 index樣板 , { restaurants } 是 { restaurants:restaurants }的縮寫

      .catch(error => console.error(error)) // 錯誤處理
  }
})

router.get('/catasc', (req, res) => {
  if (Restaurant) {
    Restaurant.find() // 取出Todo model裡的所有資料(也可在()中寫入指定要找的資料)
      .lean() // 把mongoose的model物件轉換成乾淨的 js資料陣列
      .sort({ category: 'asc' })
      .then(restaurantData => res.render('index', { restaurantData })) // 將資料傳給 index樣板 , { restaurants } 是 { restaurants:restaurants }的縮寫

      .catch(error => console.error(error)) // 錯誤處理
  }
})

router.get('/locasc', (req, res) => {
  if (Restaurant) {
    Restaurant.find() // 取出Todo model裡的所有資料(也可在()中寫入指定要找的資料)
      .lean() // 把mongoose的model物件轉換成乾淨的 js資料陣列
      .sort({ location: 'asc' })
      .then(restaurantData => res.render('index', { restaurantData })) // 將資料傳給 index樣板 , { restaurants } 是 { restaurants:restaurants }的縮寫

      .catch(error => console.error(error)) // 錯誤處理
  }
})

module.exports = router
