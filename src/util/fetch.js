import axios from 'axios';

const publicFetch = axios.create({
  baseURL: 'https://clavis-rest.herokuapp.com/',
});

export default publicFetch;
