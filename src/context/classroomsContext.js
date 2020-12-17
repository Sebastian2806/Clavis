import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ClassroomContext = createContext();
const { Provider } = ClassroomContext;

const ClassroomProvider = ({ children }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [filters, setFilters] = useState({});

  const getClassroomById = (id) => classrooms.find((el) => el.id === id);

  return (
    <Provider
      value={{
        classrooms,
        setClassrooms,
        getClassroomById,
        filters,
        setFilters,
      }}
    >
      {children}
    </Provider>
  );
};

ClassroomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ClassroomContext, ClassroomProvider };
