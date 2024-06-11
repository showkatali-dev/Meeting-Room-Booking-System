import { IRoom } from './room.interface';
import { Room } from './room.model';

export const createRoomIntoDB = async (payload: IRoom) => {
  const room = await Room.create(payload);
  return room;
};
