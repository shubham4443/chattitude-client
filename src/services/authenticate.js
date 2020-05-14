import axios from 'axios';

export const login = ({name, password}) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, {name, password}, { withCredentials: true })
  .then(({data, status}) => ({data, status}))
  .catch(ex => ex);
}

export const logout = () => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/logout`, {withCredentials: true })
  .then(({status}) => status)
  .catch(ex => ex);
}

export const register = ({name, password, email}) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/register`, {name, password, email})
  .then(({data, status}) => ({data, status}))
  .catch(ex => ex);
}

export const verifyToken = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/verify`, {withCredentials: true})
  .then(({status, data}) => ({status, data}))
  .catch(ex => ex);
}
