import {put, call, take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {getRawText} from '../Slices/generalSlice';
import {getCurrentLocationSaga} from '../../utils/location';
import {watchSocket} from '../../utils/socket';
import {getCurrentPath} from '../../utils/generalFunctions';
import {changeStatus, clearGeneralSlice} from '../Slices/generalSlice';
import {clearConfigurationSlice} from '../Slices/configurationSlice';
import {clearChatSlice} from '../Slices/chatSlice';
import {clearPeopleSlice} from '../Slices/peopleSlice';

export function* helloApp() {
  console.log('WELCOME TO OUR APP!');
  yield put(clearGeneralSlice());
  yield put(clearConfigurationSlice());
  yield put(clearChatSlice());
  yield put(clearPeopleSlice());
}

const getData = async () => {
  const path = getCurrentPath();
  return await axios.get(`${path}/dataFromSetsToClient`);
};

export function* getConstants() {
  try {
    const response = yield call(getData);
    yield put(getRawText({rawText: response.data}));
  } catch (e) {
    console.log(e);
  }
}

export function* rootSaga() {
  console.log('---------------START---------------');
  yield call(helloApp);
  yield call(getConstants);

  console.log('---------Saga--------'); //FIX ME
  // while (true) {
  yield take(changeStatus.type);
  yield fork(getCurrentLocationSaga);
  yield fork(watchSocket);
  yield take(changeStatus.type);
  // }
}
