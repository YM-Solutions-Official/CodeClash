import { customAlphabet } from "nanoid";
import { ROOM_ID } from "./constants";

const generate = customAlphabet(ROOM_ID.ALPHABET, ROOM_ID.SIZE);

export const generateRoomId = () => generate();
