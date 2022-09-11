/* eslint-disable no-unused-vars */
import React, {useEffect, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ChatItem from '../Components/Chat/ChatItem';
import styles from '../Styles/ChatStyle';
import UpperBar from '../Components/UpperBar';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {openChats} from '../store/Slices/chatSlice';
import {getCurrentPath} from '../utils/generalFunctions';
import {useMemo} from 'react';

const Chat = () => {
  const path = getCurrentPath();
  const myUserId = useSelector(state => state.configuration.userConfig.user_id);
  const verifyToken = useSelector(state => state.configuration.token);
  const chats = useSelector(state => state.chat.OpenChats);
  const refresh = useSelector(state => state.general.refresh);
  console.log('Chats: ', chats);
  const currChat = useSelector(state => state.chat.currChat);
  const dispatch = useDispatch();

  const getAllChats = useMemo(async () => {
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
  }, [dispatch, myUserId, path, verifyToken]);

  // useEffect(() => {
  //   getAllChats();
  // }, [dispatch, myUserId, path, refresh]);

  return (
    <View style={styles.View.manageChatsContainer}>
      <View style={styles.View.UpperBarContainer}>
        <UpperBar />
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={styles.Text.title}>my Chats</Text>
      </View>
      <ScrollView>
        {chats?.map((item, index) => (
          <ChatItem key={index} data={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;
