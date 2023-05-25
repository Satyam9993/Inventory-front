import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  inv : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setInv: (state, action) => {
      state.inv = action.payload.inv;
    },
    setInvUpdate: (state, action) => {
      const updatedInv = state.inv.map((inv) => {
        if (inv._id === action.payload.invUpdate._id) return action.payload.invUpdate;
        return inv;
      });
      state.inv = updatedInv;
    },
  },
});

export const { setLogin, setLogout, setInv, setEmployee } = authSlice.actions;
export default authSlice.reducer;