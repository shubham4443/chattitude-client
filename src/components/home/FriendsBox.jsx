import React, { useState, useEffect } from 'react';
import './style.css';
import { ChatList } from 'react-chat-elements';
import { getSuggestedUsers } from '../../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, set } from 'automate-redux';
import { notify } from '../../utils';
// services
import {
  createChatroom,
  getChatrooms,
  getChats,
  readChats
} from '../../services/chatroom';
// antd
import { Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const FriendsBox = ({socket, logout, slideLeft}) => {
  const dispatch = useDispatch();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const suggestedFriends = useSelector((state) => state.suggestedFriends);
  const name = useSelector((state) => state.profile.name);
  const chatrooms = useSelector((state) => state.chatrooms);

  useEffect(() => {
    dispatch(increment('uiState.pendingRequests'));
    getChatrooms(name)
      .then((res) => dispatch(set('chatrooms', res)))
      .finally(() => dispatch(decrement('uiState.pendingRequests')));
  }, [isSearchVisible, dispatch, name]);

  const fetchChats = (chatroom_id, friendName) => {
    dispatch(increment('uiState.pendingRequests'));
    getChats(chatroom_id)
      .then((res) => dispatch(set('chats', res)))
      .catch((ex) =>
        notify(
          'error',
          'There was some error in fetching the chats',
          ex.toString(),
          5
        )
      )
      .finally(() => {
        dispatch(set('currentChat', {friendName, chatroom_id}));
        slideLeft();
        readChats(chatroom_id, name);
        dispatch(decrement('uiState.pendingRequests'));
      });
  };

  const addFriend = (friendName) => {
    dispatch(increment('uiState.pendingRequests'));
    createChatroom(name, friendName)
      .then((res) => {
        if (!res.chatroom_id) {
          notify(
            'success',
            `${friendName} is added in your friend list`,
            '',
            5
          );
          setSearchVisible(false);
        } else {
          dispatch(set('currentChat.friendName', friendName));
          fetchChats(res.chatroom_id, friendName);
          setSearchVisible(false);
        }
      })
      .finally(() => dispatch(decrement('uiState.pendingRequests')));
  };

  const openChatroom = (friendName) => {
    const chatroom_id = chatrooms.find((val) => val.user === friendName).docs.chatroom_id;
    fetchChats(chatroom_id, friendName);
  };

  const onSearchFriends = (value) => {
    if (value.length % 3 === 0) {
      dispatch(increment('uiState.pendingRequests'));
      getSuggestedUsers(value)
        .then((res) => dispatch(set('suggestedFriends', res)))
        .finally(() => {
          dispatch(decrement('uiState.pendingRequests'));
          setSearchVisible(true);
        });
    }
  };

  return (
    <div className="mobile-view-friends-box">
      {!isSearchVisible && (
        <>
        <Button
          onClick={logout}
          style={{ width: '100%', marginBottom: 10 }}
          size='large'
          shape='round'
        >
          Logout
        </Button>
        <Button
          onClick={() => setSearchVisible(true)}
          style={{ width: '100%' }}
          size='large'
          shape='round'
        >
          Add a friend
        </Button>
        </>
      )}
      {isSearchVisible && (
        <Input
          placeholder='Search'
          size='large'
          onChange={(e) => onSearchFriends(e.target.value)}
          style={{ width: '100%' }}
          prefix={
            <ArrowLeftOutlined
              className='site-form-item-icon'
              onClick={() => setSearchVisible(false)}
            />
          }
        />
      )}
      {!isSearchVisible && (
        <ChatList
          onClick={(val) => openChatroom(val.title)}
          className='chat-list'
          dataSource={chatrooms.map((val) => ({
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            title: val.user,
            subtitle: val.docs.last_text,
            date: new Date(val.docs.date),
            unread: name === val.docs.user1 ? val.docs.user1unread : val.docs.user2unread,
          }))}
        />
      )}
      {isSearchVisible && (
        <ChatList
          onClick={(val) => addFriend(val.title)}
          className='search-user-list'
          dataSource={suggestedFriends.map((val) => ({
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            alt: 'Avatar.js',
            title: val,
          }))}
        />
      )}
    </div>
  );
};

export default FriendsBox;
