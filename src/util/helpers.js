import moment from 'moment';

export const setVH = () => {
  return () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
};

const labels = [
  {
    status: 'free',
    label: 'wolna',
  },
  {
    status: 'book',
    label: 'zarezerwowana',
  },
  {
    status: 'take',
    label: 'zajęta',
  },
];

export const getStatusLabel = (status) => labels.filter((el) => el.status === status);

export const isSameOrBefore = (startTime, endTime) =>
  moment(startTime, 'DD-MM-YYYYTHH:mmZ').isSameOrBefore(moment(endTime, 'DD-MM-YYYYTHH:mmZ'));

export const addToFullDate = (currentTime, duration = 90, unit = 'm') =>
  moment(currentTime, 'DD-MM-YYYYTHH:mmZ').add(duration, unit).format('DD-MM-YYYYTHH:mmZ');

export const getFullDate = () => moment().format('DD-MM-YYYYTHH:mmZ');

export const formatDate = ({ dateStart, dateEnd, timeStart, timeEnd }) => ({
  startAt: moment(`${dateStart.split('-').reverse().join('-')} ${timeStart}`).format('YYYY-MM-DDTHH:mmZ'),
  endAt: moment(`${dateEnd.split('-').reverse().join('-')} ${timeEnd}`).format('YYYY-MM-DDTHH:mmZ'),
});

export const getFromDate = (time, format = 'DD-MM-YYYY') => moment(time, 'DD-MM-YYYYTHH:mmZ').format(format);

export const transformDateToLocal = (time, format = 'DD-MM-YYYY', incomingFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ') =>
  moment(time, incomingFormat).local().format(format);
