const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
// 雜湊密碼套件
const bcrypt = require('bcryptjs')


// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填！' })
  }
  if(password !== confirmPassword){
    errors.push({ message: '密碼不相符！' })
  }
  if( errors.length ) {
    return res.render( 'register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個電子信箱已存在！' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })} 
      User.create({
        name,
        email,
        password
      })
      .then(res.redirect('/users/login'))
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})


router.get('/logout', (req, res) => {
  req.logOut()
  // req.flash('success_msg', '您已成功登出！')
  res.redirect('/users/login')
})

module.exports = router