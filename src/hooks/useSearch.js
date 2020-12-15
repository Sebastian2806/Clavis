import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useSearch = () => {
  const [searchBy, setSearchBy] = useState('');

  const filterByField = (elements, field) => elements.filter((el) => el[field].startsWith(searchBy));

  return [searchBy, setSearchBy, filterByField];
};
