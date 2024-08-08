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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('User Controller', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/sign-up').send({
            username: 'joe.westy@gmail.com',
            password: 'password123'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
    }));
    it('should get a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/users/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('matheus');
    }));
    it('should update a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put('/users/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI')
            .send({
            username: 'updateduser'
        });
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('updateduser');
    }));
    it('should delete a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/users/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI');
        expect(response.status).toBe(204);
    }));
});
