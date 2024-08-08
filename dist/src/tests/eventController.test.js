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
describe('Event Controller', () => {
    it('should create a new event', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/events')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI')
            .send({
            title: 'event aaa',
            date: 'sunday'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('event');
    }));
    it('should get an event by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/events/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
    }));
    it('should update an event by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put('/events/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI')
            .send({
            title: 'Updated Event'
        });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Event');
    }));
    it('should delete an event by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/events/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjNjY5YThiZDliOWQwMGIzYWY5ZSIsImlhdCI6MTcyMzA1Nzc4MiwiZXhwIjoxNzIzMDYxMzgyfQ.3Jf5SRdI-x76vtUDmFNLfjU9BmgPMscLJ35DfA2qptI');
        expect(response.status).toBe(204);
    }));
});
