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
  try {
    User.findById(req.params.userID, (err: Error, user: UserDoc) => {
      if (err) res.status(404).json("ユーザは存在しません")
      res.send(user)
    })
  } catch (err) {
    res.status(500).json({err})
  }
})

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age
  })
  const savedUser = await user.save();
  res.json(savedUser)
})

router.delete('/:userID', async (req, res) => {
  const user = await User.remove({ _id: req.params.userID })
  res.send(user)
})

export default router
