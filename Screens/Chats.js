/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import ChatItem from '../Components/Chat/ChatItem';
import styles from '../Styles/ChatStyle';
import UpperBar from '../Components/UpperBar';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {openChats} from '../store/Slices/chatSlice';
import {getCurrentPath} from '../utils/generalFunctions';

const Chat = () => {
  const path = getCurrentPath();
  const myUserId = useSelector(state => state.configuration.userConfig.user_id);
  const verifyToken = useSelector(state => state.configuration.token);
  const chats = useSelector(state => state.chat.OpenChats);
  const dispatch = useDispatch();

  const getAllChats = async () => {
    try {
      const res = await axios.get(`${path}/chats/${myUserId}`, {
        headers: {
          Authorization: 'Bearer ' + verifyToken,
        },
      });
      dispatch(openChats({OpenChats: res.data}));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <View style={styles.View.manageChatsContainer}>
      <View style={styles.View.UpperBarContainer}>
        <UpperBar />
      </View>
      <Text style={styles.Text.title}>my Chats</Text>
      <View style={styles.View.chatListContainer}>
        {chats?.map((item, index) => (
          <ChatItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

export default Chat;
