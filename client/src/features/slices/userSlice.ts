import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            action: PayloadAction<{ accessToken: string}>
        ) {
            localStorage.setItem(
                "accessToken",
                JSON.stringify({
                    accessToken: action.payload.accessToken,
                })
            );
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
            state.user = null
        }
    },
});

export const { setToken, clearToken, setUser, clearUser } = userSlice.actions;


export const selectIsLoggedIn = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? true : false;
};

export const selectUser = async () => {
    const userData = await JSON.parse(localStorage.getItem("user") as string)
    return userData
}


export const userReducer = userSlice.reducer;