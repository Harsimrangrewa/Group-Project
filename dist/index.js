"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static("public"));
// fake database
const flowers = [
    { id: 1, name: "Rose", color: "Red" },
    { id: 2, name: "Tulip", color: "Yellow" },
    { id: 3, name: "Daisy", color: "White" },
];
app.get("/api/flowers", (req, res) => {
    res.json(flowers);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map