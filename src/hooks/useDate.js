import { useState } from 'react';
import moment from 'moment';
import { addToDate } from '../util/helpers';

// eslint-disable-next-line import/prefer-default-export
export const useDate = ({ duration = 90, unit = 'm' } = {}) => {
  const [currentDate] = useState(() => moment().format('DD-MM-YYYY HH:mm'));
  const [futureDate] = useState(addToDate(currentDate, duration, unit));
  const [dateObj] = useState({
    dateStart: currentDate.split(' ')[0],
    dateEnd: futureDate.split(' ')[0],
    startAt: currentDate.split(' ')[1],
    endAt: futureDate.split(' ')[1],
  });

  return [dateObj, currentDate, futureDate];
};
