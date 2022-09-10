import {StyleSheet} from 'react-native';
import Theme from './Theme';

const styles = StyleSheet.create({
  SafeAreaView: {
    container: {
      height: Theme.height,
      width: Theme.width,
      backgroundColor: Theme.backgroundColor,
    },
  },

  scroll: {
    height: '85%',
  },
  ButtonSection: {
    width: '85%',
    alignSelf: 'center',
  },

  Image: {
    myPic: {
      borderColor: '#0E6070',
      borderRadius: 40,
      height: 80,
      width: 80,
      alignSelf: 'center',
    },
    penPic: {
      right: 10,
      height: 25,
      width: 25,
      color: Theme.highLightColor,
    },
  },
  Pressable: {
    touchablePen: {
      justifyContent: 'flex-end',
      width: 30,
      height: 30,
    },
    Pressables: {
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
      height: 35,
      width: '80%',
      marginTop: 10,

      marginBottom: 30,
    },
    uploadPhotos: {
      backgroundColor: Theme.secondColor,
      padding: 5,
      margin: 3,
      borderRadius: 7,
    },
    updateProfile: {
      backgroundColor: Theme.highLightColor,
      padding: 5,
      margin: 3,
      borderRadius: 7,
    },
    updateMyDetails: {
      backgroundColor: Theme.highLightColor,
      elevation: 10,
      borderRadius: 10,
      padding: 7,
    },
  },
  View: {
    photosContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    emailPassword: {
      width: '100%',
      marginTop: 10,
    },
    fullName: {
      width: '85%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      height: 40,
    },
    column: {
      flexDirection: 'column',
    },
    chipsBlocks: {
      left: 20,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '90%',
    },
    birthday: {
      marginTop: 30,
      flexDirection: 'column',
      left: 10,
    },
    hobbies: {
      marginTop: 30,
      flexDirection: 'column',
      left: 10,
    },
    viewStyle: {
      backgroundColor: '#EBEBEB', // birthday,hobbies
      marginLeft: 30,
      padding: 7,
      margin: 5,
      borderRadius: 5,
      width: '80%',
      borderWidth: 1,
      borderColor: 'white',
      elevation: 5,
    },
    updateMyDetails: {
      margin: 10,
      alignSelf: 'center',
    },
  },

  title: {
    color: '#ffffff',
    fontSize: 36,
    alignSelf: 'center',
  },
  TInput: {
    textInput: {
      width: '85%',
      height: 40,
      alignSelf: 'center',
      marginTop: 10,
      backgroundColor: 'white',
      elevation: 10,
      borderRadius: 10,
    },
    nameInput: {
      width: 150,
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      elevation: 10,
      borderRadius: 10,
    },
  },
  Text: {
    catagoryText: {
      left: 40,
      marginTop: 15,
      color: '#FFFFFF',
      fontFamily: Theme.fontFamilyRegular,
    },

    hobbiesText: {
      color: '#FFFFFF',
      alignSelf: 'flex-start',
      fontFamily: Theme.fontFamilyRegular,
      left: 40,
    },
    dateText: {
      fontFamily: Theme.fontFamilyRegular,
      alignItems: 'center',
    },
    updateMyDetails: {
      color: '#000000',
      fontFamily: Theme.fontFamilyBold,
    },
  },
  DatePicker: {
    datePicker: {
      width: '80%',
      marginTop: 10,
    },
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 35,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  TextInput: {
    emailInput: {
      fontSize: 18,
      width: '85%',
      elevation: 10,
      alignSelf: 'center',
      backgroundColor: '#CCCCCC',
      borderRadius: 5,
      color: '#000000',
      fontFamily: Theme.fontFamilyRegular,
    },
  },
});

export default styles;
