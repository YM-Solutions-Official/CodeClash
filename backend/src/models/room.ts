import { model, Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_MODEL, ROOM_STATUS } from "../lib/constants";

const RoomSchema = new Schema<IRoom>(
  {
    creatorId: {
      type: String,
      required: true,
    },
    joinedUser: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ROOM_STATUS),
      default: ROOM_STATUS.WAITING,
    },
  },
  { timestamps: true }
);

const RoomModel = model(ROOM_MODEL, RoomSchema);

export default RoomModel;
