import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import User from '../models/User';


const userCreateValidateInput = [
    body('names').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isString().notEmpty(),
    body('status').optional().isInt(),
];


const userUpdateValidateInput = [
    body('names').optional().isString().notEmpty(),
    body('email').optional().isEmail(),
    body('password').optional().isString().notEmpty(),
    body('status').optional().isInt(),
];

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const find = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.find(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const store = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }

    const { names, email, password, status } = req.body;
    try {
        const user = new User(names, email, password, status);
        user.save()
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ errors: errors.array() });
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.find(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0] });
    }


    const { names, email, password, status } = req.body;
    try {
        const userUpdate = await User.update(id, names, email, password, status);
        res.status(200).json(userUpdate);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.find(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return
    }
    try {
        User.destroy(id)
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        return res.status(400).json(error);
    }
};

export default {
    userUpdateValidateInput,
    userCreateValidateInput,
    index,
    store,
    find,
    update,
    destroy
}