import { model, Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_MODEL, ROOM_STATUS } from "../lib/constants";

const RoomSchema = new Schema<IRoom>(
  {
    creatorId: {
      type: Types.ObjectId,
      required: true,
    },
    joinedUser: {
      type: Types.ObjectId,
      required: false,
    },
    status: {
      type:String,
      enum: Object.values(ROOM_STATUS),
      required: true,
    },
  },
  { timestamps: true }
);

const RoomModel = model(ROOM_MODEL, RoomSchema);

export default RoomModel;
