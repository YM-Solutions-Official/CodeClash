"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOM_ID = exports.ROOM_STATUS = void 0;
var ROOM_STATUS;
(function (ROOM_STATUS) {
    ROOM_STATUS["WAITING"] = "waiting";
    ROOM_STATUS["ACTIVE"] = "active";
    ROOM_STATUS["FINISHED"] = "finished";
})(ROOM_STATUS || (exports.ROOM_STATUS = ROOM_STATUS = {}));
var ROOM_ID;
(function (ROOM_ID) {
    ROOM_ID["ALPHABET"] = "ABCDEFGHIJKLMNPQRSTUVWXYZ23456789";
    ROOM_ID[ROOM_ID["SIZE"] = 6] = "SIZE";
})(ROOM_ID || (exports.ROOM_ID = ROOM_ID = {}));
//# sourceMappingURL=enum.js.map