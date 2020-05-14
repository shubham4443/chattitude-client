import { createStore } from "redux";
import { generateReducers } from "automate-redux";

// Initial state of redux
const initialState = {
  uiState: {
    isLoggedIn: false,
    app_initializing: false,
    pendingRequests: 0,
    isMobileScreen: false,
    counter: 0
  },
  profile: {
    name: ""
  },
  currentChat: {
    friendName: "",
    chatroom_id: "",
  },
  suggestedFriends: ["shubham4443", "LightYagami", "walter_white", "Tony Soprano", "Lelouch", "Vito Corleone", "Freddie_Mercury"],
  chatrooms: [],
  chats: []
};

// Generate reducers with the initial state and pass it to the redux store
export default createStore(generateReducers(initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());