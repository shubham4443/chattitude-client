import axios from 'axios';

export const getSuggestedUsers = (searchTxt) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users/suggested`, {searchTxt})
  .then(({data}) => data)
  .catch(ex => ex);
}