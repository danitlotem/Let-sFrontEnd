/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Styles/NotificationStyle';
import axios from 'axios';
import Theme from '../Styles/Theme';

const NotificationItem = props => {
  console.log(props);
  const seen = props.details.seen;
  console.log(seen);
  const id = props.details.notification_id;
  return (
    <View
      style={{
        // backgroundColor: '#B0D0D9',
        width: '90%',
        marginTop: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        elevation: 10,
        marginBottom: 5,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1.5,
        backgroundColor: seen !== 1 ? Theme.secondColor : 'white',
      }}>
      <Pressable
        style={styles.Pressables}
        onPress={async () => {
          console.log('****');
          const res = await axios.put(
            `http://192.168.1.101:3000/notifications/${id}`,
          );
          console.log(res.data);
        }}>
        <Ionicons name="close-outline" size={35} color={'#0E6070'} />
        <Ionicons
          name="notifications-outline"
          size={35}
          color={'#0E6070'}
          style={styles.iconItem}
        />
      </Pressable>
      <View style={styles.row}>
        <View style={styles.Details}>
          <Text style={styles.title}>{props.details.title}</Text>
          <Text style={styles.body}>{props.details.content}</Text>
        </View>
        <View>
          {/* BUG - OUT OF SCREEN RANGE */}
          <Text>{props.details.creation_date}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
