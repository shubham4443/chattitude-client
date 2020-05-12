import React, { useEffect, useState } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/authenticate';
import { notify } from '../../utils';
import { set, reset } from 'automate-redux';
import io from 'socket.io-client';
import SwipeableViews from 'react-swipeable-views';
import { useHistory } from 'react-router-dom';
import FriendsBox from '../../components/home/FriendsBox';
import ChatBox from '../../components/home/ChatBox';
// antd
import { Row, Col } from 'antd';

const styles = {
  chatBox: {
    overflowY: 'scroll',
    maxHeight: 600,
    backgroundColor: 'white',
    borderRadius: '15px 0px 0px 15px',
  },
};

const socket = io(process.env.REACT_APP_API_URL);

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const chatrooms = useSelector((state) => state.chatrooms);
  const isMobileScreen = useSelector((state) => state.uiState.isMobileScreen);

  useEffect(() => {
    chatrooms.forEach((val) => {
      socket.emit('room', val.docs.chatroom_id);
    });
  }, [chatrooms]);

  const onLogoutBtnClick = () => {
    logout().then((status) => {
      if (status !== 200) {
        notify('error', 'Could not logout. There was some error', '', 5);
        return;
      }
      dispatch(set('uiState.isLoggedIn', false));
      dispatch(set('profile.name', ''));
      dispatch(reset('currentChat'));
      history.push('/login');
      notify('success', 'Logged out', '', 5);
    });
  };

  return (
    <>
      {isMobileScreen && (
        <SwipeableViews disabled={true} index={index} style={{height: "100%"}}>
          <FriendsBox socket={socket} logout={onLogoutBtnClick} slideLeft={() => setIndex(1)} />
          <ChatBox socket={socket} slideRight={() => setIndex(0)}/>
        </SwipeableViews>
      )}
      {!isMobileScreen && (
        <Row className='window' gutter={0}>
          <Col sm={10} xs={24} className='friends-box'>
            <FriendsBox socket={socket} logout={onLogoutBtnClick} slideLeft={() => setIndex(1)} />
          </Col>
          <Col sm={14} xs={0} style={styles.chatBox}>
            <ChatBox socket={socket} slideRight={() => setIndex(0)} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
