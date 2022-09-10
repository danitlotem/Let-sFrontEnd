/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import {View, Pressable, Text} from 'react-native';
import NotificationItem from '../Components/NotificationItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Styles/NotificationStyle';
import axios from 'axios';
import UpperBar from '../Components/UpperBar';
import {useSelector, useDispatch} from 'react-redux';
import {setNotificatation} from '../store/Slices/generalSlice';
import {getCurrentPath} from '../utils/generalFunctions';

const Notifications = () => {
  const userConfig = useSelector(state => state.configuration.userConfig);
  const notifications = useSelector(state => state.general.myNotification);
  const dispatch = useDispatch();
  const path = getCurrentPath();
  const verifyToken = useSelector(state => state.configuration.token);

  const showNotifications = async () => {
    try {
      const res = await axios.get(
        `${path}/notifications/${userConfig.user_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + verifyToken,
          },
        },
      );
      dispatch(setNotificatation({myNotification: res.data}));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <UpperBar />
      <Pressable style={styles.clearAllBtn}>
        <Ionicons name="trash-outline" size={25} color={'white'} />
        <Text style={styles.textClearBtn}>Clear All</Text>
      </Pressable>
      <View style={styles.itemsContainer}>
        {notifications.map((item, index) => {
          return <NotificationItem key={index} details={item} />;
        })}
      </View>
    </View>
  );
};

export default Notifications;
