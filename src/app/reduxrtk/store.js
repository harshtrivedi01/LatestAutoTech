"use client";

import slice from "./slice";

const { configureStore } = require("@reduxjs/toolkit");
export const store = configureStore({  
     reducer: {
        auth:slice
     } });