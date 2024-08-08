"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.eventSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    dayOfWeek: joi_1.default.string()
        .valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
        .required()
});
