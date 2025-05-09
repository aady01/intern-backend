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
exports.listDoctors = exports.addDoctor = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const addDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield prisma_1.default.doctor.create({ data: req.body });
        res.status(201).json(doctor);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.addDoctor = addDoctor;
const listDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, gender, experience, specialty } = req.query;
    const filters = {};
    if (gender)
        filters.gender = gender;
    if (experience)
        filters.experience = Number(experience);
    if (specialty)
        filters.specialty = specialty;
    try {
        const skip = (Number(page) - 1) * Number(limit);
        const [doctors, total] = yield Promise.all([
            prisma_1.default.doctor.findMany({
                where: filters,
                skip,
                take: Number(limit),
            }),
            prisma_1.default.doctor.count({ where: filters }),
        ]);
        res.json({
            data: doctors,
            meta: {
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.listDoctors = listDoctors;
