"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./routes/users"));
const apiPrefix = '/api';
const router = (app) => {
    app.use(`${apiPrefix}/users`, users_1.default);
};
exports.default = router;
