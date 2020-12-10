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

  return [dateObj, currentDate, futureDate];
};
