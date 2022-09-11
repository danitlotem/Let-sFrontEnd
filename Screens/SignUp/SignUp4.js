/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {updateMainPictuer} from '../../store/Slices/configurationSlice';
import {setTempPictures, getMyPictures} from '../../store/Slices/picturesSlice';
import styles from '../../Styles/SignUpStyle';
import Theme from '../../Styles/Theme';
import {getCurrentPath} from '../../utils/generalFunctions';

const SignUp4 = ({route, navigation}) => {
  const {page} = route.params;
  const path = getCurrentPath();
  const myPictures = useSelector(state => state.pictures.myPictures);
  const tempPictures = useSelector(state => state.pictures.tempPictures);
  const conf = useSelector(state => state.configuration.userConfig);
  const dispatch = useDispatch();
  const verifyToken = useSelector(state => state.configuration.token);

  useEffect(() => {
    // dispatch(clearSignUpConfig()); // NOTICE
    if (myPictures[0] !== undefined) {
      dispatch(setTempPictures({key: 0, value: myPictures[0].image}));
    }
    if (myPictures[1] !== undefined) {
      dispatch(setTempPictures({key: 1, value: myPictures[1].image}));
    }
    if (myPictures[2] !== undefined) {
      dispatch(setTempPictures({key: 2, value: myPictures[2].image}));
    }
  }, [dispatch, myPictures]);

  const pickImage = num => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true, maxHeight: 200, maxWidth: 200},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          console.error(response.customButton);
        } else {
          if (num === 1)
            dispatch(
              setTempPictures({key: 0, value: response.assets[0].base64}),
            );
          if (num === 2)
            dispatch(
              setTempPictures({key: 1, value: response.assets[0].base64}),
            );
          if (num === 3)
            dispatch(
              setTempPictures({key: 2, value: response.assets[0].base64}),
            );
        }
      },
    );
  };

  const uploadImage = async () => {
    try {
      let res;
      if (tempPictures[0] !== undefined) {
        res = await axios.post(
          `${path}/userPictures/${conf.user_id}`,
          {
            base64image: tempPictures[0].image,
            main_image: '1',
          },
          {
            headers: {
              Authorization: 'Bearer ' + verifyToken,
            },
          },
        );
      }
      if (tempPictures[1] !== undefined) {
        await axios.post(
          `${path}/userPictures/${conf.user_id}`,
          {
            base64image: tempPictures[1].image,
            main_image: '0',
          },
          {
            headers: {
              Authorization: 'Bearer ' + verifyToken,
            },
          },
        );
      }
      if (tempPictures[2] !== undefined) {
        await axios.post(
          `${path}/userPictures/${conf.user_id}`,
          {
            base64image: tempPictures[2].image,
            main_image: '0',
          },
          {
            headers: {
              Authorization: 'Bearer ' + verifyToken,
            },
          },
        );
      }
      dispatch(getMyPictures({myPictures: tempPictures}));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.modalContainer}>
      <View>
        <View>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.title}>Add some pictures</Text>
          <Text style={styles.subText}>You must add at least 1 picture</Text>
          <Text style={styles.subText}>upload only JPEG/ JPG/ PNG</Text>
        </View>
        <View style={styles.addPicSection}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginLeft: 107,
            }}>
            <Pressable style={{justifyContent: 'center', marginRight: 20}}>
              <Text>X</Text>
            </Pressable>
            <Pressable
              style={{justifyContent: 'center'}}
              onPress={() => pickImage(1)}>
              <Image
                source={
                  tempPictures[0] !== undefined
                    ? {uri: `data:image/gif;base64,${tempPictures[0].image}`}
                    : require('../../assets/Images/Camera.png')
                }
                style={styles.mainPic}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginLeft: 115,
            }}>
            <Pressable style={{justifyContent: 'center', marginRight: 20}}>
              <Text>X</Text>
            </Pressable>
            <Pressable
              style={{justifyContent: 'center'}}
              onPress={() => pickImage(2)}>
              <Image
                source={
                  tempPictures[1] !== undefined
                    ? {uri: `data:image/gif;base64,${tempPictures[1].image}`}
                    : require('../../assets/Images/Camera.png')
                }
                style={styles.picView}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginLeft: 115,
            }}>
            <Pressable style={{justifyContent: 'center', marginRight: 20}}>
              <Text>X</Text>
            </Pressable>
            <Pressable
              style={{justifyContent: 'center'}}
              onPress={() => pickImage(3)}>
              <Image
                source={
                  tempPictures[2] !== undefined
                    ? {uri: `data:image/gif;base64,${tempPictures[2].image}`}
                    : require('../../assets/Images/Camera.png')
                }
                style={styles.picView}
              />
            </Pressable>
          </View>
          <View>
            <Pressable
              style={{
                backgroundColor: Theme.secondColor,
                padding: 6,
                width: 120,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => uploadImage()}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: Theme.fontFamilyBold,
                  color: '#FFFFFF',
                }}>
                Upload
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={{
                backgroundColor: Theme.highLightColor,
                padding: 6,
                width: 120,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => {
                page === 'SignUp3'
                  ? navigation.navigate('Log In stack')
                  : navigation.navigate('My Profile');
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: Theme.fontFamilyBold,
                  color: '#FFFFFF',
                }}>
                Skip
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp4;
