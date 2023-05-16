import express from 'express';
import UserController from '../constrollers/UserController';

const userRoute = express.Router();

userRoute.get('/', UserController.index);
userRoute.post('/', UserController.userCreateValidateInput, UserController.store);
userRoute.get('/:id', UserController.find);
userRoute.put('/:id',  UserController.userUpdateValidateInput, UserController.update);
userRoute.delete('/:id', UserController.destroy);

export default userRoute;