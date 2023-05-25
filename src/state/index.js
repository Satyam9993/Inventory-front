import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  inv : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userId = null;
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
    setInvAddNew: (state, action) => {
      state.inv = [...state.inv, action.payload.inv];
    },
  },
});

export const { setLogin, setLogout, setInv, setInvUpdate, setInvAddNew } = authSlice.actions;
export default authSlice.reducer;