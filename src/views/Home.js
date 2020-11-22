import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <main>
      <h1>test 123</h1>
    </main>
  );
};
export default Home;
