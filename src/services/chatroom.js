import axios from 'axios';

export const createChatroom = (user1, user2) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/chatroom/create`, {user1, user2})
  .then(response => response.data)
  .catch(ex => ex)
}

export const getChatrooms = (user1) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/chatrooms/fetch/${user1}`)
  .then(response => {
    return response.data.map((val) => {
      return {
        user: val.user,
        docs: {
          ...val._doc
        }
      }
    })
  })
  .catch(ex => ex)
}

export const getChats = (chatroom_id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/chats/fetch/${chatroom_id}`)
  .then(response => response.data)
  .catch(ex => ex);
}

export const readChats = (chatroom_id, user) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/chats/read`, {chatroom_id, user})
  .then(response => response)
  .catch(ex => ex)
}