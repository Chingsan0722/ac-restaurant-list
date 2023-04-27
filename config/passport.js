const passport = require('passport')
// 注意第二行設定和一般的引用不太一樣，需要再多傳入一個 Strategy 物件，這是在官網說明裡找到的指定寫法
const LocalStrategy = require('passport-local').Strategy
// 載入 User model 因為下方有用到
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略，usernameField: 'email' 代表要驗證的為User資料中的email
  // 後方引入email, password, done 參數，其中done為passport專門設計的method
  // 用來回應驗證是否成功
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // 驗證成功but：未找到相關資料
        if(!user) {
          return done(null, false, { message: 'This email is not registered!' })
        } else if (user.password !== password){
          // 驗證成功but：帳號或密碼錯誤
          return done(null, false, { message: 'Email or Password incorrect.' })
        }   
          // 驗證成功and使用者存在
          return done(null, user)
        })
      //驗證失敗
      .catch(err => done(err,false))
  }))}

  // 設定序列化與反序列化

  // 序列化從user去找出user.id
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 反序列化從id去找出user資料
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
