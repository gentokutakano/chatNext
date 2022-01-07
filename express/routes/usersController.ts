import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  // new GetUsers(req, res).main().catch(next)
  console.log('connect to mongoose!!')
})

export default router
