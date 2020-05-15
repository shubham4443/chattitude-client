import axios from 'axios';

export const getSuggestedUsers = (searchTxt) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users/suggested`, {searchTxt})
  .then(({data}) => data)
  .catch(ex => ex);
}

export const subscribeToPushNoti = (name, subscription) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {name, subscription})
  .then(response => response)
  .catch(ex => ex)
}

export const unsubscribeToPushNoti = (name) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/notifications/unsubscribe`, {name})
  .then(response => response)
  .catch(ex => ex)
}