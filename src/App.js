import React, {useEffect} from 'react';
import './App.css';
import Routes from './Routes';
import { verifyToken } from './services/authenticate';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'automate-redux';
import 'react-chat-elements/dist/main.css';

function App() {
  const dispatch = useDispatch();
  const isMobileScreen = useSelector(state => state.uiState.isMobileScreen);

  dispatch(set("uiState.app_initializing", true));
  verifyToken()
  .then(({status, data}) => {
    if(status === 200) {
      dispatch(set("uiState.isLoggedIn", true))
      dispatch(set("profile.name", data.name))
    }
    return
  })
  .finally(() => dispatch(set("uiState.app_initializing", false)))

  dispatch(set('uiState.isMobileScreen', window.innerWidth < 768));

  useEffect(() => window.addEventListener('resize', e => {
    dispatch(set('uiState.isMobileScreen',e.target.innerWidth < 768));

  }))

  return (
    <div className={isMobileScreen ? "App" : "large-view-App"}>
      <Routes />
    </div>
  );
}

export default App;
