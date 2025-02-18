import { createSlice } from "@reduxjs/toolkit";

// ✅ Load stored data from localStorage safely
const loadFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
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
    Ltitude: "",
    Ip_address: "", 
    Device_id: "upen",
  },
  otpdata:  {
    type: "otp",
    otp: "",
    phone: loadFromLocalStorage("formData")?.phone || "", // ✅ Safe access
    firebase_id: "",
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(state.formData)); // ✅ Save formData
      }
    },
    setOtp: (state, action) => {
      state.otpdata = { ...state.otpdata, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("otpdata", JSON.stringify(state.otpdata)); // ✅ Save otpdata
      }
    },
  },
});

export const { setFormData, setOtp } = slice.actions;
export default slice.reducer;
