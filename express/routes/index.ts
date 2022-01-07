import Express from 'express'
import usersController from './usersController'
import { Handler } from '../core/handler'

const router = Express.Router()

router.get('/', (req, res, next) => {
  const handler = new Handler(req, res)
  return handler.json<string>("Hello Gen!!")
})

router.get('/gen', (req, res, next) => {
  const handler = new Handler(req, res)
  return handler.json<number>(1234567);
})

router.use('/users', usersController)

export default router
