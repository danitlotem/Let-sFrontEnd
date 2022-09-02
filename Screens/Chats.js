/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
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
  const chats = useSelector(state => state.chat.OpenChats);
  const dispatch = useDispatch();

  const getAllChats = async () => {
    //FIX ME there is a problem with update list of open chats
    try {
      const res = await axios.get(`${path}/chats/${myUserId}`);
      dispatch(openChats({OpenChats: res.data}));
    } catch (error) {
      alert(error);
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
        {chats.map((item, index) => (
          <ChatItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

export default Chat;
