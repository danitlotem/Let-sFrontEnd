import {StyleSheet} from 'react-native';
import Theme from './Theme';

const styles = StyleSheet.create({
  container: {
    height: Theme.height,
    width: Theme.width,
    backgroundColor: Theme.backgroundColor,
  },
  clearAllBtn: {
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#105A87',
    borderColor: 'white',
    borderWidth: 1,
    elevation: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  itemsContainer: {
    alignItems: 'center',
  },
  item: {
    width: '90%',
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    elevation: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#fff',
    borderWidth: 1.5,
  },
  Pressables: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30,
    width: 70,
    flexDirection: 'row',
  },
  Picture: {
    width: 40,
    height: 40,
  },
  Details: {
    paddingRight: 120,
    right: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    alignItems: 'flex-start',
    color: Theme.secondColor,
    fontFamily: Theme.fontFamilyBold,
  },
  body: {
    alignItems: 'flex-start',
    color: Theme.secondColor,
    fontFamily: Theme.fontFamily,
  },
  textClearBtn: {
    color: 'white',
    fontSize: 18,
  },
  iconItem: {
    backgroundColor: '#65B0C6',
    borderRadius: 18,
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
});

export default styles;
