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
const express_1 = __importDefault(require("express"));
const generateFile_1 = __importDefault(require("./Function/generateFile"));
const executeCpp_1 = __importDefault(require("./Function/executeCpp"));
const executePy_1 = __importDefault(require("./Function/executePy"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/run', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language = "cpp", code } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" });
    }
    try {
        // To generate the code file
        const filePath = yield (0, generateFile_1.default)(language, code);
        // To run the file and send the output in the response
        let output;
        if (language === "cpp" || language === "c") {
            output = yield (0, executeCpp_1.default)(filePath);
        }
        else if (language === "py") {
            output = yield (0, executePy_1.default)(filePath);
        }
        return res.json({ filePath, output });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
app.listen(port, () => {
    console.log('Connected successfully on port ' + port);
});
