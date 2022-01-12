import { Router } from 'express'
import userModel from '../models/userModel'

const router = Router()

router.get('/', async(req, res, next) => {
//   userModel.find({}).then((users) => {//find({})で全てのデータを取得
//   res.send(users)//取得した全てのデータを返す
// }).catch((e) => {
//   res.status(500).send()//取得失敗したら、HTTPステータス500を返す
// })
  const users = await userModel.find({})
  res.json(users)
  console.log('connect to mongoose!!')
})

export default router
