import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  nearbyPeople: [],
  myFriends: [],
  friendToSearch: '',
  usersBySearchModes: {},
  receivedRequests: [],
  sendRequests: [],
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
    updateReceivedRequests: (state, action) => {
      state.receivedRequests = [...action.payload.requests];
    },
    updateSendRequests: (state, action) => {
      state.sendRequests = [...action.payload.sent];
    },
    searchFriend: (state, action) => {
      state.friendToSearch = action.payload.friendToSearch;
    },
    clearPeopleSlice: state => initialState,
  },
});

export const {
  searchFriend,
  updateNearbyPeople,
  updateMyFriends,
  updateSendRequests,
  updateUsersBySearchModes,
  updateReceivedRequests,
  clearPeopleSlice,
} = peopleSlice.actions;

export default peopleSlice.reducer;
