import {Router} from 'express'
import  UserController  from '../controllers/userController'

const userController = new UserController()

const router = Router()

router.post('/user', userController.create)

export default router