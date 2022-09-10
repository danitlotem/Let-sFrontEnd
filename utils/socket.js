import {eventChannel} from 'redux-saga';
import {select, call, take, put} from 'redux-saga/effects';
import {newMessageWaiting, addMessageToChat} from '../store/Slices/chatSlice';
import {refreshOnlineUsers} from '../store/Slices/generalSlice';
import {getCurrentSocketPath} from './generalFunctions';

const getToken = state => state.configuration.token;
const getMyID = state => state.configuration.userConfig.user_id;
const path = getCurrentSocketPath();

function socketService(token) {
  return eventChannel(emitter => {
    const socket = new WebSocket(`${path}`, null, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });

    if (socket) {
      socket.onopen = () => {
        console.log('SOCKET CONNECTED');
      };
      socket.onmessage = event => {
        if (
          JSON.parse(event.data).msg === 'New User Connected' ||
          JSON.parse(event.data).msg === 'User Disconnected'
        ) {
          return emitter({type: refreshOnlineUsers.type, payload: true});
        } else {
          return emitter({type: newMessageWaiting.type, payload: event.data});
        }
      };
      socket.onclose = () => {
        console.log('SOCKET CLOSED');
      };
    }
    return () => {
      console.log('Socket off');
    };
  });
}

export function* watchSocket() {
  const token = yield select(getToken);
  const myID = yield select(getMyID);
  const requestChan = yield call(socketService, token);

  try {
    while (true) {
      let data = yield take(requestChan);
      console.log('***DATA:', data);
      if (data.type === refreshOnlineUsers.type) {
        yield put(refreshOnlineUsers(true));
      }
      if (data.type === newMessageWaiting.type) {
        let theirMessage = JSON.parse(data.payload);
        console.log('----2: socket----');
        console.log(theirMessage);
        if (theirMessage.receiver_user_id === myID) {
          yield put(addMessageToChat({myMessage: theirMessage}));
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
