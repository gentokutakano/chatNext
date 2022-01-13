import express, { Router } from 'express'
import { UserValidProperty } from '../constants/api_value'
import User, { UserDoc } from '../models/userModel'

const router = Router()
///送られてるデータを取得するためexpress.json()を追加
router.use(express.json());

router.get('/', async(req, res, next) => {
  const users = await User.find({})
  res.json(users)
  console.log('connect to mongoose!!')
})

router.get('/:userID', (req, res) => {
  User.findById(req.params.userID, (err: Error, user: UserDoc) => {
    if (err) console.log(err)
    res.send(user)
  })
})

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age
  })
  const savedUser = await user.save();
  res.json(savedUser)
})

export default router
