import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    type : "login",
    phone: "",
    language: "",
    longitude: "",
    latitude: "",
    ip_address: "",
    device_id:" ",
  },

  otpdata: {
    otp: "",
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOtp: (state, action) => {
      state.otpdata = action.payload;
    },
  },
});

export const { setFormData ,setOtp } = slice.actions;
export default slice.reducer;
