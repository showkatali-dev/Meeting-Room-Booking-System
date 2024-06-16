import { Booking } from '../booking/booking.model';

export const getUserBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId });
  return result;
};
