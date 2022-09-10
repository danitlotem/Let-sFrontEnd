import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  OpenChats: [],
  currChat: [],
  messageWaiting: false,
};

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    openChats: (state, action) => {
      state.OpenChats = [...action.payload.OpenChats];
    },
    setCurrentChat: (state, action) => {
      state.currChat = [...action.payload.currChat];
    },
    newMessageWaiting: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.messageWaiting = action.payload.messageWaiting;
      console.log(`----1: ${state.messageWaiting}----`);
    },
    addMessageToChat: (state, action) => {
      state.currChat = [...state.currChat, action.payload.myMessage]; // FIX ME - add react.memo
      console.log('-----------CURR CHAT-------------');
      console.log(JSON.stringify(state.currChat, null, 2));
    },
    clearChatSlice: state => initialState,
  },
});

export const {
  openChats,
  setCurrentChat,
  addMessageToChat,
  newMessageWaiting,
  clearChatSlice,
} = chatSlice.actions;

export default chatSlice.reducer;
