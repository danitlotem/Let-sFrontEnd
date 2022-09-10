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
      state.messageWaiting = action.payload.messageWaiting;
    },
    addMessageToChat: (state, action) => {
      state.currChat = [...state.currChat, action.payload.myMessage]; // FIX ME - add react.memo
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
