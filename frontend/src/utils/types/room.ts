import { ROOM_STATUS } from "../constants";

export interface CreateRoomRes {
  roomId?: string;
  creatorId?: string;
  error?: string;
}

export interface GetRoomInfoRes {
  users?: string[];
  roomCode?: string;
  status?: ROOM_STATUS;
  creatorId?: string;
  problem?: any;
  startTime?: number;
  duration?: number;
  timeRemaining?: number;
  hasSubmitted?: boolean;
  winner?: string;
  submissions?: any;
  endTime?: number;
  error: string;
}

export interface JoinRoomRes {
  roomId: string;
  users: string[];
  status: ROOM_STATUS;
  creatorId: string;
  problem: any;
  startTime: number;
  duration: number;
  timeRemaining: number;
  hasSubmitted: boolean;
  winner: string;
  submissions: any;
  endTime: number;
  error: string;
}

export interface StartMatchRes {
  error?: string;
  success?: boolean;
}

export interface MatchStartedRes {
  problem: any;
  startTime: number;
  duration: number;
  endTime: number;
}
