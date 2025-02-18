import { createSlice } from "@reduxjs/toolkit";

// ✅ Utility functions for localStorage
const saveToLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  }
  return null;
};

// ✅ Initial state with localStorage fallback
const initialState = {
  formData: loadFromLocalStorage("formData") || {
    type: "login",
    phone: "",
    Language: "en",
    Longitude: "",
    Latitude: "", // ✅ Fixed typo
    Ip_address: "",
    Device_id: "upen",
  },
  otpdata: loadFromLocalStorage("otpdata") || {
    type: "otp",
    type2: "resend otp",
    otp: "",
    phone: loadFromLocalStorage("formData")?.phone || "",
    firebase_id: "",
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      saveToLocalStorage("formData", state.formData); // ✅ Save formData
    },
    setOtp: (state, action) => {
      state.otpdata = { ...state.otpdata, ...action.payload };
      saveToLocalStorage("otpdata", state.otpdata); // ✅ Save otpdata
    },
    clearAuthData: (state) => {
      state.formData = initialState.formData;
      state.otpdata = initialState.otpdata;
      if (typeof window !== "undefined") {
        localStorage.removeItem("formData");
        localStorage.removeItem("otpdata");
      }
    },
  },
});

export const { setFormData, setOtp, clearAuthData } = slice.actions;
export default slice.reducer;
