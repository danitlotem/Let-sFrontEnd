/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import React, {useState} from 'react';
import {View, Text, ScrollView, Button, Pressable, Image} from 'react-native';
import styles from '../../Styles/SignUpStyle';
import Theme from '../../Styles/Theme';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateUserId,
  updateConfiguration,
  updateHobbies,
} from '../../store/Slices/configurationSlice';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {getCurrentPath} from '../../utils/generalFunctions';

const SignUp3 = ({route, navigation}) => {
  const path = getCurrentPath();
  const dispatch = useDispatch();
  const myHobbies = useSelector(state => state.configuration.myHobbies);
  const hobbies = useSelector(state => state.general.rawText.Hobbies);
  const signUpConfig = useSelector(state => state.configuration.signUpConfig);

  const getImages = item => {
    if (item === 'Sport')
      return require(`../../assets/Images/Hobbies/Hobbie-Sport.jpg`);
    if (item === 'Food')
      return require(`../../assets/Images/Hobbies/Hobbie-Food.jpg`);
    if (item === 'Music')
      return require(`../../assets/Images/Hobbies/Hobbie-Music.jpg`);
    if (item === 'Art')
      return require(`../../assets/Images/Hobbies/Hobbie-Art.jpg`);
    if (item === 'Intelligence')
      return require(`../../assets/Images/Hobbies/Hobbie-Intelligence.jpg`);
    if (item === 'Tech')
      return require(`../../assets/Images/Hobbies/Hobbie-Tech.jpg`);
    if (item === 'Outdoor')
      return require(`../../assets/Images/Hobbies/Hobbie-Outdoor.jpg`);
    if (item === 'Indoor')
      return require(`../../assets/Images/Hobbies/Hobbie-Indoor.jpg`);
  };

  let configuration = {hobbies: [...myHobbies]};
  const hobbiesListItemStyle = title => {
    if (title === 'Cancel') return {marginTop: 3, backgroundColor: 'red'};
    return {
      marginTop: 3,
      borderRadius: 5,
      padding: 3,
      backgroundColor: myHobbies.includes(title)
        ? Theme.highLightColor
        : 'transparent',
    };
  };
  const updateState = () => {
    dispatch(updateConfiguration({signUpConfig: {...configuration}}));
  };
  const AddUserToDB = async event => {
    try {
      console.log('--------3-------');
      const response = await axios.post(`${path}/auth/register`, signUpConfig);
      console.log(response.data);
      if (response.data.hasOwnProperty('msg')) {
        console.error(response.data.msg);
      } else {
        dispatch(updateUserId({user_id: response.data.user_id}));
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  const addToList = val => {
    if (myHobbies.includes(val) === true) {
      const temp = myHobbies.filter(hobbie => hobbie !== val);
      dispatch(
        updateHobbies({
          myHobbies: [...temp],
        }),
      );
    } else {
      dispatch(
        updateHobbies({
          myHobbies: [...myHobbies, val],
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick your hobbies</Text>
      <ScrollView style={{height: '100%'}}>
        {hobbies.slice(1).map((item, index) => {
          return (
            <View key={index}>
              <Collapse>
                <CollapseHeader>
                  <View style={{margin: 5}}>
                    <Image
                      style={styles.images}
                      source={getImages(item.type)}
                    />
                    <View style={styles.imageTitleContainter}>
                      <Text style={styles.imageText}>{item.type}</Text>
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody style={{width: '80%', alignSelf: 'center'}}>
                  {item.lst.map((elem, ind) => {
                    return (
                      <Pressable
                        key={ind}
                        style={hobbiesListItemStyle(elem)}
                        onPress={() => addToList(elem)}>
                        <Text style={{color: '#000000'}}>{elem}</Text>
                      </Pressable>
                    );
                  })}
                </CollapseBody>
              </Collapse>
            </View>
          );
        })}

        <View style={styles.ButtonSection1}>
          <Button
            color="#48D1CC"
            title="Continue"
            onPress={async () => {
              console.log('SignUp config:', signUpConfig);
              updateState();
              if (await AddUserToDB())
                navigation.navigate('SignUp4', {page: 'SignUp3'});
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp3;
