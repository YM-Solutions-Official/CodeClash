import { Types } from "mongoose";
import { ROOM_STATUS } from "../lib/constants/enum";

export interface IRoom {
  creatorId: Types.ObjectId;
  joinedUser?: Types.ObjectId;
  status?: ROOM_STATUS;
}
