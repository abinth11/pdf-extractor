import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const accessToken = localStorage.getItem("accessToken")
interface User {
    name: string;
    email: string
}
interface InitialState {
    accessToken: string | null;
    user: User | null;
    isLoggedIn: boolean;
}
const initialState: InitialState = {
    accessToken,
    user: null,
    isLoggedIn: accessToken ? true : false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(
            state,
            action: PayloadAction<{ accessToken: string }>
        ) {
            console.log(accessToken)
            localStorage.setItem("accessToken",action.payload.accessToken);
            state.accessToken = action.payload.accessToken
            state.isLoggedIn = true;
        },
        clearToken(state) {
            state.accessToken = "";
            localStorage.removeItem("accessToken");
            state.isLoggedIn = false;
        },
        setUser(state, action: PayloadAction<User>) {
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
            state.user = action.payload
        },
        clearUser(state) {
            localStorage.removeItem("user")
            state.user = null
        }
    },
});

export const { setToken, clearToken, setUser, clearUser } = userSlice.actions;


export const selectIsLoggedIn = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? true : false;
};

export const selectUser =  (state:RootState) => state.user.user


export const userReducer = userSlice.reducer;