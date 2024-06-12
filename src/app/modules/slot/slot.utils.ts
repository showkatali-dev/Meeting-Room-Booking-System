import httpStatus from 'http-status';
import AppError from '../../error/app-error';

export const convertTimeToMinute = (time: string) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

export const calculateTotalSlotDuration = (
  startTime: string,
  endTime: string,
) => {
  return convertTimeToMinute(endTime) - convertTimeToMinute(startTime);
};

export const generateSlotTimes = (
  startTime: string,
  endTime: string,
  slotDuration: number,
) => {
  const totalDuration = calculateTotalSlotDuration(startTime, endTime);

  if (totalDuration < slotDuration) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid slot duration');
  }

  const totalSlots = Math.round(totalDuration / slotDuration);
  const slotTimes: { startTime: string; endTime: string }[] = [];
  for (let i = 0; i < totalSlots; i++) {
    const start_time = i === 0 ? startTime : slotTimes[i - 1].endTime;
    const d = new Date();
    d.setHours(Number(start_time.split(':')[0]));
    d.setMinutes(Number(start_time.split(':')[1]) + slotDuration);
    const end_time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    slotTimes.push({ startTime: start_time, endTime: end_time });
  }

  return slotTimes;
};
