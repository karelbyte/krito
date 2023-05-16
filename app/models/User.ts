import { PrismaClient } from '.prisma/client'
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "../interfaces/IUser";

export default class User implements IUser {

    id: string;
    names: string;
    email: string;
    status: number;
    password: string

    constructor(name: string, email: string, password: string, status?: number) {
        this.id = uuidv4();
        this.names = name;
        this.email = email;
        this.password = password;
        this.status = status || 1
    }

    async save() {
        const prisma = new PrismaClient()
        return await prisma.users.create({
            data: {
                id: this.id,
                names: this.names,
                email: this.email,
                password: this.password,
                status: this.status
            },
        })
    }

    static async update(id: string, names?: string, email?: string, password?: string, status?: number) {
        const prisma = new PrismaClient()
        return await prisma.users.update({
            where: { id },
            data: { names, email, password, status },
        })
    }

    static async find(id: string) {
        const prisma = new PrismaClient()
        return await prisma.users.findFirst({
            where: {
                id
            },
        })
    }

    static async findAll() {
        const prisma = new PrismaClient()
        return await prisma.users.findMany()
    }

    static async destroy(id: string,) {
        const prisma = new PrismaClient()
        return await prisma.users.delete({
            where: { id },
          })
    }

} 