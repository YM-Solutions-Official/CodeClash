import { Server, Socket } from "socket.io";
import RoomModel from "../models/room";
import { Types } from "mongoose";
import { ROOM_STATUS } from "../lib/constants";

export function setupRoomSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected", socket.id);

    // Create Room
    socket.on("create_room", async () => {
      try {
        const room = await RoomModel.create({
          creatorId: new Types.ObjectId(),
          status: ROOM_STATUS.WAITING,
        });
        socket.join(room._id.toJSON());
        console.log(`Room created ${room._id} by ${socket.id}`);
        return {
          status: "success",
          message: "Room created successfully",
          roomId: room._id.toString(),
        };
      } catch (error) {}
    });

    // Join Room
    socket.on("join_room", async ({ roomId }: { roomId: string }) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) return { status: "error", error: "Room Not Found" };

        if (!room.joinedUser) {
          room.joinedUser = new Types.ObjectId();
          await room.save();
          socket.join(room.id.toString());

          //   Notify Creator
          socket
            .to(room._id.toString())
            .emit("user_joined", { userId: socket.id });

          return {
            status: "success",
            users: [room.creatorId, room.joinedUser],
          };
        }
      } catch (error) {
        return { success: "error", error: "Failed to join room" };
      }
    });

    // Start Match
    socket.on("start_match", async ({ roomId }: { roomId: string }) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) return { status: "error", error: "Room Not Found" };

        if (room.creatorId.toString() === socket.id) {
          room.status = ROOM_STATUS.ACTIVE;
          await room.save();

          io.in(room._id.toString()).emit("match_started");
          console.log(`Match started in room ${roomId}`);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected", socket.id);
    });
  });
}
