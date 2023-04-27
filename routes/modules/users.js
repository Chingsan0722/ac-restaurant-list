const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
// 雜湊密碼套件
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logOut()
  // req.flash('success_msg', '您已成功登出！')
  res.redirect('/users/login')
})

module.exports = router