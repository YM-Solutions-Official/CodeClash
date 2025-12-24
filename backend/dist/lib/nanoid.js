"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoomId = generateRoomId;
const nanoid_1 = require("nanoid");
const constants_1 = require("./constants");
function generateRoomId() {
    const generatedRoomId = (0, nanoid_1.customAlphabet)(constants_1.ROOM_ID.ALPHABET, constants_1.ROOM_ID.SIZE);
    return generatedRoomId;
}
console.log(generateRoomId());
//# sourceMappingURL=nanoid.js.map