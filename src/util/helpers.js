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
