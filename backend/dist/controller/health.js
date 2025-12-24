"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
healthRouter.get("/ping", (_, res) => {
    res.json({ message: "Backend bootup!" });
});
exports.default = healthRouter;
//# sourceMappingURL=health.js.map