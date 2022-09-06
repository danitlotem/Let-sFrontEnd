import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  rawText: {},
  status: 'disconnected',
  myLatitude: 0,
  myLongitude: 0,
  myStatus: '',
  myNotification: [],
  constants: 'not accepted',
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    getRawText: (state, action) => {
      state.rawText = {...action.payload.rawText};
    },
    setNotificatation: (state, action) => {
      state.myNotification = action.payload.myNotification;
    },
    changeStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setMyLocation: (state, action) => {
      state.myLatitude = action.payload.myLatitude;
      state.myLongitude = action.payload.myLongitude;
    },
    updateMyStatus: (state, action) => {
      state.myStatus = action.payload.status;
    },
    clearGeneralSlice: state => initialState,

    constantsAccepted: state => {
      state.constants = 'accepted';
      console.log('CONSTANTS ACCEPTED');
    },
  },
});

export const {
  getRawText,
  setNotificatation,
  changeStatus,
  getConstants,
  setMyLocation,
  updateMyStatus,
  clearGeneralSlice,
  constantsAccepted,
} = generalSlice.actions;

export default generalSlice.reducer;
