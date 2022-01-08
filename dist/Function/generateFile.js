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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const dirCodes = path_1.default.join(__dirname, "codes");
// Create directory if it doesn't exist'
if (!fs_1.default.existsSync(dirCodes)) {
    console.log("Creating directory " + dirCodes);
    fs_1.default.mkdirSync(dirCodes, { recursive: true });
}
const generateFile = (format, code) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = (0, uuid_1.v4)();
    const filename = `${jobId}.${format}`;
    const filePath = path_1.default.join(dirCodes, filename);
    yield fs_1.default.writeFileSync(filePath, code);
    return filePath;
});
exports.default = generateFile;
