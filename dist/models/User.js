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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const uuid_1 = require("uuid");
class User {
    constructor(name, email, password, status) {
        this.id = (0, uuid_1.v4)();
        this.names = name;
        this.email = email;
        this.password = password;
        this.status = status || 1;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            return yield prisma.users.create({
                data: {
                    id: this.id,
                    names: this.names,
                    email: this.email,
                    password: this.password,
                    status: this.status
                },
            });
        });
    }
    static update(id, names, email, password, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            return yield prisma.users.update({
                where: { id },
                data: { names, email, password, status },
            });
        });
    }
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            return yield prisma.users.findFirst({
                where: {
                    id
                },
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            return yield prisma.users.findMany();
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            return yield prisma.users.delete({
                where: { id },
            });
        });
    }
}
exports.default = User;
