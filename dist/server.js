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
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const PORT = 3333;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to a simple Github API");
}));
app.get('/:repo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { repo } = req.params;
        // const { title, author } = req.query
        /**
         * O @title que eu tiro do req.query é os parâmetros que vem depois
         * do "?", então caso você queira pegar mais informações é só ir adicionando
         * nos query params e você pode colocar quantos quiser
         *
         * http://localhost:3333/fireheet?title=blambers
         *
         * Por exemplo se você quiser pegar tipo, o nome do autor e titulo iria ficar
         *
         * http://localhost:3333/fireheet?title=blambers&author=robison
         *
         * O "&" separa os parâmetros, e ai pra pegar pra usar no código é só colocar
         * o nome do parâmetro q você espera, ali junto na declaração do title, que ai
         * ficaria do jeito que ta comentado embaixo
        */
        const response = yield api_1.default.get(`/orgs/${repo}/repos`);
        if (!response) {
            throw new Error('Repository not found');
        }
        const { owner } = response.data[0];
        res.json(owner.url);
    }
    catch (error) {
        console.error(error.message);
    }
}));
// Initialize server
app.listen(PORT, () => {
    console.warn(`Server listening on port: ${PORT}`);
});
