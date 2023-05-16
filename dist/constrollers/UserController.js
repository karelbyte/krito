"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const userCreateValidateInput = [
    (0, express_validator_1.body)('names').isString().notEmpty(),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString().notEmpty(),
    (0, express_validator_1.body)('status').optional().isInt(),
];
const userUpdateValidateInput = [
    (0, express_validator_1.body)('names').optional().isString().notEmpty(),
    (0, express_validator_1.body)('email').optional().isEmail(),
    (0, express_validator_1.body)('password').optional().isString().notEmpty(),
    (0, express_validator_1.body)('status').optional().isInt(),
];
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.find(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }
    const { names, email, password, status } = req.body;
    try {
        const user = new User_1.default(names, email, password, status);
        user.save();
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ errors: errors.array() });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.find(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }
    const { names, email, password, status } = req.body;
    try {
        const userUpdate = yield User_1.default.update(id, names, email, password, status);
        res.status(200).json(userUpdate);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.find(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    try {
        User_1.default.destroy(id);
        res.status(200).json({ message: 'User deleted!' });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.default = {
    userUpdateValidateInput,
    userCreateValidateInput,
    index,
    store,
    find,
    update,
    destroy
};
