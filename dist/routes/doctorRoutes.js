"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controllers/doctorController");
const router = express_1.default.Router();
router.post("/add-doctor", doctorController_1.addDoctor);
router.get("/list-doctor-with-filter", doctorController_1.listDoctors);
exports.default = router;
