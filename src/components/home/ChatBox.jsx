import React, { useEffect, useState } from 'react';
import { MessageList } from 'react-chat-elements';
import { useSelector, useDispatch } from 'react-redux';
//antd
import { Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { push } from 'automate-redux';
const { Search } = Input;

const ChatBox = ({socket, slideRight}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const name = useSelector((state) => state.profile.name);
  const chats = useSelector((state) => state.chats);
  const friendName = useSelector(state => state.currentChat.friendName);
  const currentChatroom_id = useSelector(state => state.currentChat.chatroom_id);

  useEffect(() => {
    socket.on('message', (docs) => {
      if(currentChatroom_id === docs.chatroom_id) {
      dispatch(push("chats", docs))
      }
    })
  }, [socket, currentChatroom_id, dispatch])

  const onSend = (value) => {
    if(value){
    socket.emit('send', { chatroom_id: currentChatroom_id, userFrom: name, userTo: friendName, text: value});
    setText("");
    }
  };

  return (
    <>
      <div
        style={{
          height: 35,
          borderBottom: '1px solid #d3d3d3',
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        <ArrowLeftOutlined
          className='menu-icon'
          style={{ float: 'left', marginLeft: 10, marginTop: 7 }}
          onClick={slideRight}
        />
        <b>{friendName}</b>
      </div>
      <MessageList
      className='message-list'
      lockable={true}
      toBottomHeight={'100%'}
      dataSource={
        chats.length > 0 ?
        chats.map((val) => ({
        position: val.userFrom === name ? 'right' : 'left',
        text: val.text,
        date: new Date(val.date),
        status: 'received',
      }))
      : []
    }
    />
      <Search
        placeholder='Type a message'
        enterButton='Send'
        value={text}
        size='large'
        onSearch={onSend}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

export default ChatBox;
