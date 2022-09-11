/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {SafeAreaView, View, Text, Pressable, Image} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import styles from '../Styles/MenuStyle';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../Styles/Theme';
import {StackActions} from '@react-navigation/native';
import {clearConfigurationSlice} from '../store/Slices/configurationSlice';
import {clearChatSlice} from '../store/Slices/chatSlice';
import {clearGeneralSlice, changeStatus} from '../store/Slices/generalSlice';
import {clearPeopleSlice} from '../store/Slices/peopleSlice';

const CustomSidebarMenu = props => {
  const navigation = useNavigation();
  const fullName = useSelector(state => state.configuration.fullName);
  const email = useSelector(state => state.configuration.email);
  const userConfig = useSelector(state => state.configuration.userConfig);

  const myProfilePicture = useSelector(
    state => state.pictures.myPictures[0]?.image,
  );
  const myStatus = useSelector(state => state.general?.myStatus);
  const mySearchMode = useSelector(
    state => state.configuration.filters?.search_mode_filter,
  );
  const dispatch = useDispatch();
  const userLogout = () => {
    try {
      //FIX ME
      navigation.dispatch(StackActions.popToTop());
      dispatch(clearConfigurationSlice());
      dispatch(clearChatSlice());
      dispatch(clearGeneralSlice());
      dispatch(clearPeopleSlice());
      dispatch(changeStatus({status: 'disconnect'}));
      navigation.navigate('Log In stack');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {Object.keys(userConfig).length !== 0 && (
          <View>
            <Pressable onPress={() => navigation.navigate('My Profile')}>
              <Image
                style={{
                  height: 110,
                  width: 110,
                  borderColor: Theme.secondColor,
                  borderWidth: 2,
                  borderRadius: 55,
                  alignSelf: 'center',
                }}
                source={{
                  uri: `data:image/gif;base64,${
                    myProfilePicture !== undefined
                      ? myProfilePicture
                      : userConfig.image
                  }`,
                }}
              />
            </Pressable>
            <Text style={styles.fullNameText}>{fullName}</Text>
            <Text style={styles.emailText}>{email}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>{mySearchMode}</Text>
              {myStatus ? (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons
                    color={'#000000'}
                    size={15}
                    name={'chatbubble-ellipses-outline'}
                  />
                  <Text style={styles.detailsText}>{myStatus}</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        )}
        {Object.keys(userConfig).length === 0 && (
          <View>
            <Text>please log in</Text>
          </View>
        )}
      </View>
      <DrawerItemList {...props} />
      <Pressable
        onPress={() => userLogout()}
        style={{marginTop: 30, alignSelf: 'center', flexDirection: 'row'}}>
        <Ionicons
          style={{marginRight: 10}}
          size={18}
          name={'log-out-outline'}
        />
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
