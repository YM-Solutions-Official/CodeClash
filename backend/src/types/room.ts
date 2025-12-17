import { ROOM_STATUS } from "../lib/constants/enum";

export interface IRoom {
  creatorId: string;
  joinedUser?: string;
  status?: ROOM_STATUS;
}
