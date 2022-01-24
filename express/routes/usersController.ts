import express, { Router } from 'express'
import { UserValidProperty } from '../constants/api_value'
import User, { UserDoc } from '../models/User'
import { GetUsers } from './users/get_users';

const router = Router()
///送られてるデータを取得するためexpress.json()を追加
router.use(express.json());

router.get('/', async (req, res, next) => {
  // const users = await User.find({})
  // res.json(users)
  new GetUsers(req, res).main().catch(next)
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

router.patch('/:userID', async (req, res) => {
  console.log(req.body.age)
  const user = await User.updateOne({ _id: req.params.userID },
    { $set: { name: req.body.name, age: req.body.age } })
  res.send(user)
})

export default router
