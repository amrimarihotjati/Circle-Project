import { createSlice } from "@reduxjs/toolkit";
import { InterfaceUser } from "../../types/userType";
import { setAuthToken } from "../../libs/Api";



const initialsState: InterfaceUser = {
	id: 0,
	full_name: "",
	username: "",
	email: "",
	photo_profile: "",
    following: [],
    followers: [],
    bio:"",
    like:[],

}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialsState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload;
            setAuthToken(payload.token);
      
            localStorage.setItem("token", payload.token);
      
            const user: InterfaceUser = {
              id: payload.id,
              full_name: payload.full_name,
              username: payload.username,
              email: payload.email,
              photo_profile: payload.photo_profile,
              following: payload.following,
              followers: payload.followers,
              bio: payload.bio,
              like: payload.like
            };
            return user;
        },
        AUTH_CHECK: (_, action) => {
        const payload = action.payload;
    
        const user: InterfaceUser = {
            id: payload.id,
            full_name: payload.full_name,
            username: payload.username,
            email: payload.email,
            photo_profile: payload.photo_profile,
            following: payload.following,
            followers: payload.followers,
            bio: payload.bio,
            like: payload.like
        };
        return user;
        },

        AUTH_ERROR: () => {
          localStorage.removeItem('token')  
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem('token')
        }

    }
})