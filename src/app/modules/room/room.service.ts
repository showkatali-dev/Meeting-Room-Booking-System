import { IRoom } from './room.interface';
import { Room } from './room.model';

export const createRoomIntoDB = async (payload: IRoom) => {
  const room = await Room.create(payload);
  return room;
};

export const getAllRoomsFromDB = async () => {
  const rooms = await Room.find();
  return rooms;
};

export const getRoomByIdFromDB = async (id: string) => {
  const room = await Room.findById(id);
  return room;
};

export const updateRoomByIdIntoDB = async (
  id: string,
  payload: Partial<IRoom>,
) => {
  const room = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return room;
};

export const softDeleteRoomByIdFromDB = async (id: string) => {
  const room = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return room;
};
