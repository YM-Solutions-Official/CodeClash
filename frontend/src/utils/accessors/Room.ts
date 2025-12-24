import { getSocket } from "@/lib/socket";
import {
  CreateRoomRes,
  GetRoomInfoRes,
  JoinRoomRes,
  StartMatchRes,
} from "../types/room";

export class RoomAccessor {
  public createRoom(): Promise<CreateRoomRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("create_room", {}, (response: CreateRoomRes) => {
          if (response.creatorId) {
            localStorage.setItem("room_creator", response.creatorId);
          }

          res(response);
        });
      } catch (error) {
        console.log("CREATE ROOM ERROR:", error);
        rej(error);
      }
    });
  }

  public getRoomInfo(roomId: string): Promise<GetRoomInfoRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("get_room_info", { roomId }, (response: GetRoomInfoRes) => {
          res(response);
        });
      } catch (error) {
        console.log("GET ROOM INFO ERROR:", error);
        rej(error);
      }
    });
  }

  public async joinRoom(roomCode: string): Promise<JoinRoomRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("join_room", { roomCode }, (response: JoinRoomRes) => {
          res(response);
        });
      } catch (error) {
        console.log("JOIN ROOM ERROR:", error);
        rej(error);
      }
    });
  }

  public async startMatch(roomId: string): Promise<StartMatchRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("start_match", { roomId }, (response: StartMatchRes) => {
          res(response);
        });
      } catch (error) {
        console.log("START MATCH ERROR:", error);
        rej(error);
      }
    });
  }
}
