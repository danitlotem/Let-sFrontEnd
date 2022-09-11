import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  myPictures: [],
  tempPictures: [],
};

export const picturesSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getMyPictures: (state, action) => {
      state.myPictures = [...action.payload.myPictures];
      console.log('myPictures');
    },
    setTempPictures: (state, action) => {
      state.tempPictures[action.payload.key] = {image: action.payload.value};
    },

    clearPicturesSlice: state => initialState,
  },
});

export const {getMyPictures, setTempPictures, clearPicturesSlice} =
  picturesSlice.actions;

export default picturesSlice.reducer;
