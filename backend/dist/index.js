"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./lib/db"));
const controller_1 = __importDefault(require("./controller"));
const health_1 = __importDefault(require("./controller/health"));
const sockets_1 = require("./sockets");
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT, MONGO_URI, FRONTEND_URL } = process.env;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use("/api", controller_1.default);
app.use("/health", health_1.default);
app.get("/ping", (_, res) => {
    res.status(200).json({
        status: "ok",
        time: new Date().toISOString(),
    });
});
async function startServer() {
    await (0, db_1.default)(MONGO_URI);
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: { origin: FRONTEND_URL },
    });
    (0, sockets_1.setupRoomSockets)(io);
    server.listen(Number(PORT), () => console.log(`Server running on port ${PORT}`));
}
startServer().catch((error) => console.error(error));
//# sourceMappingURL=index.js.map