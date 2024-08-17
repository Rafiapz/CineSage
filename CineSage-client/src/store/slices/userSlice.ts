import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchallReviewsApiCall, loginAction, loginWithGoogle, signOutAction } from "../actions/userActions";


const initialState = {

    auth: {
        status: false,
        data: null,
        role: null
    },
    reviews: {
        data: null
    }

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                if (action?.payload?.status === 'ok') {
                    state.auth.role = action.payload?.userData?.role
                    state.auth.status = true
                    state.auth.data = action?.payload?.userData
                }
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.auth.data = action?.payload?.data
                state.auth.role = action.payload?.data.role
                state.auth.status = true
            })
            .addCase(signOutAction.fulfilled, (state) => {
                state.auth.status = false
                state.auth.role = null
                state.auth.data = null

            })
            .addCase(fetchallReviewsApiCall.fulfilled, (state, action) => {
                state.reviews.data = action?.payload?.data
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                if (action?.payload?.status === 'ok') {
                    state.auth.status = true
                    state.auth.data = action?.payload?.userData
                    state.auth.role = action?.payload?.role
                }
            })


    }
})


export const { } = userSlice.actions;

export default userSlice.reducer;    