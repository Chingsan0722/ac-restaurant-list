const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
// 雜湊密碼套件
const bcrypt = require('bcryptjs')