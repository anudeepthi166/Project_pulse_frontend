import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Make Api Call For Login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (userCredObj, { rejectWithValue }) => {
    console.log(userCredObj);
    try {
      // api call for login
      let res = await axios.post(
        `http://localhost:4000/pulse/employee/${userCredObj.email}/login`,
        userCredObj
      );
      console.log("response is :", res);
      //check for Token
      if (res.data.token) {
        //store token in session storage
        sessionStorage.setItem("token", res.data.token);
        // store user obj in local storage
        localStorage.setItem("userObj", JSON.stringify(res.data.user));
        localStorage.setItem("status", "success");
        return res.data;
      }
      //if no token
      else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.log("err in catch block ", err);
      return rejectWithValue(err);
    }
  }
);

// set the variables
// user info
let user = localStorage.getItem("userObj");
if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}

// user login status
let status = localStorage.getItem("status");
if (!status) {
  status = "idle";
}

// console.log("-------------------user after local storage", user);
// console.log("-------------------status after local storage", status);

//create slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: {},
    loginStatus: "idle",
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      // remove from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("status");
      sessionStorage.clear();

      //Clearing State
      state.userObj = {};
      state.loginStatus = "idle";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      console.log("Pending State", action);
      state.loginStatus = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("fulfilled State", action);
      console.log(action.payload);
      state.userObj = action.payload.user;
      state.loginStatus = "success";
      state.errorMessage = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("Rejected State", action.payload.response.data);
      state.errorMessage = action.payload.response.data.message;
      state.loginStatus = "failed";
    });
  },
});

//export action creator functions
export let { clearState } = loginSlice.actions;

//export reducers
export default loginSlice.reducer;
