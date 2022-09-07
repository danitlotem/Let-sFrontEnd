/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import {View, Text, ScrollView, Button, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../Styles/SignUpStyle';
import TInput from '../../Components/TInput';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateConfiguration,
  updateOneSignUpConfig,
} from '../../store/Slices/configurationSlice';

function SignUp1({navigation}) {
  const first_name = useSelector(
    state => state.configuration.signUpConfig.first_name,
  );
  const last_name = useSelector(
    state => state.configuration.signUpConfig.last_name,
  );
  const email = useSelector(state => state.configuration.signUpConfig.email);
  const password = useSelector(
    state => state.configuration.signUpConfig.password,
  );
  const city = useSelector(state => state.configuration.signUpConfig.city);
  const profession = useSelector(
    state => state.configuration.signUpConfig.profession,
  );
  const phone_number = useSelector(
    state => state.configuration.signUpConfig.phone_number,
  );
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [city, setCity] = useState('');
  // const [profession, setProfession] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');

  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [isLastNameValid, setLastNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const dispatch = useDispatch();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  day = day.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');

  var year = date.getFullYear();
  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    dispatch(
      updateOneSignUpConfig({key: 'date_of_birth', value: selectedDate}),
    );
  };

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validateName = (name, setValid) => {
    if (!/[^a-zA-Z]/.test(name)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  let configuration = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    city: city,
    phone_number: phone_number,
    profession: profession,
    date_of_birth: `${day}-${month}-${year}`,
  };

  const updateState = () => {
    console.log(configuration);
    dispatch(updateConfiguration({signUpConfig: {...configuration}}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up 🥳</Text>
      <View style={styles.fullName}>
        <View style={styles.column}>
          <TInput
            style={styles.nameInput}
            value={first_name}
            title={'First Name'}
            onChangeText={val => {
              dispatch(updateOneSignUpConfig({key: 'first_name', value: val}));
              validateName(val, setFirstNameValid);
            }}
          />
          {!isFirstNameValid && (
            <Text style={styles.notValidField}>not valid</Text>
          )}
        </View>
        <View style={styles.column}>
          <TInput
            style={styles.nameInput}
            value={last_name}
            title={'Last Name'}
            onChangeText={val => {
              dispatch(updateOneSignUpConfig({key: 'last_name', value: val}));
              validateName(val, setLastNameValid);
            }}
          />
          {!isLastNameValid && (
            <Text style={styles.notValidField}>not valid</Text>
          )}
        </View>
      </View>
      <View style={styles.emailPassword}>
        <View style={styles.column}>
          <TInput
            style={styles.textInput}
            value={email}
            title={'Email'}
            onChangeText={val => {
              dispatch(updateOneSignUpConfig({key: 'email', value: val}));
              validateEmail(val);
            }}
          />
          {!isEmailValid && <Text style={styles.invalidText}>invalid</Text>}
        </View>
        <TInput
          style={styles.textInput}
          value={password}
          title={'Password'}
          secureTextEntry={true}
          onChangeText={val => {
            dispatch(updateOneSignUpConfig({key: 'password', value: val}));
          }}
        />
      </View>
      <TInput
        style={styles.textInput}
        title={`Phone number`}
        onChangeText={val =>
          dispatch(updateOneSignUpConfig({key: 'phone_number', value: val}))
        }
      />
      <TInput
        style={styles.textInput}
        title={`City`}
        onChangeText={val =>
          dispatch(updateOneSignUpConfig({key: 'city', value: val}))
        }
      />
      <TInput
        style={styles.textInput}
        title={`Profession`}
        onChangeText={val =>
          dispatch(updateOneSignUpConfig({key: 'profession', value: val}))
        }
      />
      <View style={styles.birthday}>
        <Text style={styles.catagoryText}>birthday🎈🎉✨</Text>
        <Pressable style={styles.viewStyle} onPress={() => setShow(!show)}>
          <Text style={styles.dateText}>
            {day}-{month}-{year}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChangeDate}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.ButtonSection1}>
        <Button
          color="#48D1CC"
          title="Continue"
          onPress={() => {
            updateState();
            navigation.navigate('SignUp2');
          }}
        />
      </View>
    </View>
  );
}

export default SignUp1;
