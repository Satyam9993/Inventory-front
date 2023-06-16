import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  inv : [],
  selectedInv : [],
  totalPages: 1
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
      state.totalPages = action.payload.totalPages;
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
    setselectedInvChange: (state, action) => {
      if(state.selectedInv.includes(action.payload.invId)){
        const invIds = state.selectedInv.filter((inv => inv !== action.payload.invId))
        state.selectedInv = invIds;
      }else{
        state.selectedInv = [...state.selectedInv, action.payload.invId];
      }
    },
    setselectedInvAll: (state) => {
      let invs = [];
      for(let i = 0; i < state.inv.length; i++){
        invs = [...invs, state.inv[i]._id]
      }
      state.selectedInv =  invs;
    },
    setselectedRemoveAll: (state) => {
      state.selectedInv =  [];
    },
  },
});

export const { setLogin, setLogout, setInv, setInvUpdate, setInvAddNew, setselectedInvChange, setselectedRemoveAll, setselectedInvAll } = authSlice.actions;
export default authSlice.reducer;