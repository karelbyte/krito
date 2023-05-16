"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../constrollers/UserController"));
const userRoute = express_1.default.Router();
userRoute.get('/', UserController_1.default.index);
userRoute.post('/', UserController_1.default.userCreateValidateInput, UserController_1.default.store);
userRoute.get('/:id', UserController_1.default.find);
userRoute.put('/:id', UserController_1.default.userUpdateValidateInput, UserController_1.default.update);
userRoute.delete('/:id', UserController_1.default.destroy);
exports.default = userRoute;
