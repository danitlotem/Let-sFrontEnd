import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nearbyPeople: [],
  myFriends: [],
  friendToSearch: '',
  usersBySearchModes: {},
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updateNearbyPeople: (state, action) => {
      state.nearbyPeople = action.payload.nearbyPeople;
    },
    updateUsersBySearchModes: (state, action) => {
      state.usersBySearchModes = action.payload.usersBySearchModes;
    },
    updateMyFriends: (state, action) => {
      state.myFriends = action.payload.myFriends;
    },
    searchFriend: (state, action) => {
      state.friendToSearch = action.payload.friendToSearch;
    },
    clearPeopleSlice: state => initialState,
    // {
    //   state.nearbyPeople = [];
    //   state.myFriends = [];
    //   state.friendToSearch = '';
    //   state.usersBySearchModes = {};
    // },
  },
});

export const {
  updateNearbyPeople,
  updateMyFriends,
  searchFriend,
  updateUsersBySearchModes,
  clearPeopleSlice,
} = peopleSlice.actions;

export default peopleSlice.reducer;
