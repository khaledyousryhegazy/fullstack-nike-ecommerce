import { IUser } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface ILogin {
  loading: boolean;
  userInfo: IUser | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: ILogin = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default loginSlice.reducer;
