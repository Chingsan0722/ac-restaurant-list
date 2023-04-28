const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {  // 加入關聯設定
    // type: Schema.Types.ObjectId = 去參照 User 的 ObjectId
    type: Schema.Types.ObjectId,
    // ref: 'User' = 定義對象是User model
    ref: 'User',
    // 把index: true = userId 設定成「索引」
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
