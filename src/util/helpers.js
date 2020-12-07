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
  moment(startTime, 'DD-MM-YYYY HH:mm').isSameOrBefore(moment(endTime, 'DD-MM-YYYY HH:mm'));

export const getCurrentTime = () => moment().format('HH:mm');

export const addTime = (currentTime, duration = 90, unit = 'm') =>
  moment(currentTime, 'HH:mm').add(duration, unit).format('HH:mm');

export const getCurrentDate = () => moment().format('DD-MM-YYYY');

export const addDate = (currentTime, duration = 90, unit = 'm') =>
  moment(currentTime, 'DD-MM-YYYY HH:mm').add(duration, unit).format('DD-MM-YYYY');
