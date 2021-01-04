import { useState } from 'react';
import { getFullDate, addToFullDate, getFromDate } from '../util/helpers';

// eslint-disable-next-line import/prefer-default-export
export const useDate = ({ duration = 90, unit = 'm' } = {}) => {
  const [currentDate] = useState(() => getFullDate());
  const [futureDate] = useState(() => addToFullDate(currentDate, duration, unit));
  const [dateObj] = useState({
    dateStart: getFromDate(currentDate),
    dateEnd: getFromDate(futureDate),
    timeStart: getFromDate(currentDate, 'HH:mm'),
    timeEnd: getFromDate(futureDate, 'HH:mm'),
  });

  const transformDateObj = (startAt, endAt) => {
    return {
      dateStart: getFromDate(startAt, 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mmZ'),
      dateEnd: getFromDate(endAt, 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mmZ'),
      timeStart: getFromDate(startAt, 'HH:mm', 'YYYY-MM-DDTHH:mmZ'),
      timeEnd: getFromDate(endAt, 'HH:mm', 'YYYY-MM-DDTHH:mmZ'),
    };
  };

  return [dateObj, currentDate, futureDate, transformDateObj];
};
