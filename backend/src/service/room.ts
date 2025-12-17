import { Request, Response } from "express";
import RoomModel from "../models/room";

export async function createRoom(req: Request, res: Response) {
  const { creatorId } = req.body;

  try {
    const room = await RoomModel.create({
      creatorId,
    });
    return res.status(201).json({
      status: "sucess",
      message: "Room created successfully",
      room: { _id: room._id, creatorId },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "error", message: "Internal Server Error" });
  }
}
