import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Make Api Call For Login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (userCredObj, { rejectWithValue }) => {
    try {
      // api call for login
      let res = await axios.post(
        `http://localhost:4000/pulse/employee/${userCredObj.email}/login`,
        userCredObj
      );

      //check for Token
      if (res.data.token) {
        //store token in session storage
        sessionStorage.setItem("token", res.data.token);
        // store user obj in local storage
        sessionStorage.setItem("userObj", JSON.stringify(res.data.user));
        sessionStorage.setItem("status", "success");
        return res.data;
      }
      //if no token
      else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// set the variables
// user info
let user = sessionStorage.getItem("userObj");
if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}

// user login status
let status = sessionStorage.getItem("status");
if (!status) {
  status = "idle";
}

// console.log("-------------------user after local storage", user);
// console.log("-------------------status after local storage", status);

//create slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: user,
    loginStatus: status,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      sessionStorage.clear();

      //Clearing State
      state.userObj = {};
      state.loginStatus = "idle";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loginStatus = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userObj = action.payload.user;
      state.loginStatus = "success";
      state.errorMessage = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loginStatus = "failed";
    });
  },
});

//export action creator functions
export let { clearState } = loginSlice.actions;

//export reducers
export default loginSlice.reducer;
