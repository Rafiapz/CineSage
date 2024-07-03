import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/axios";
import { jsonConfig } from "../../utils/apiUtils";


export const loginAction: AsyncThunk<any, any, any> = createAsyncThunk("user/login", async (form: any, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/user/login', form, jsonConfig);

        return response.data;
    } catch (error: any) {
        throw new Error(error)
    }
});

export const fetchUser: AsyncThunk<any, void, any> = createAsyncThunk('/user/fetch-user', async () => {
    try {

        const response = await apiClient.get('/user/fetch-user')

        return response.data

    } catch (error: any) {
        throw new Error(error)
    }
})

export const signOutAction: AsyncThunk<any, void, any> = createAsyncThunk('/user/signout', async () => {

    try {

        const response = await apiClient.get('/user/signout')

        return response.data

    } catch (error: any) {
        throw new Error(error)
    }
})



export const fetchallReviewsApiCall: AsyncThunk<any, any, any> = createAsyncThunk('/reviews/fetch-all-reviews', async (id: any) => {

    try {
        const response = await apiClient.get(`/reviews/fetch-all-reviews/${id}`)

        return response.data
    } catch (error: any) {
        throw new Error(error)
    }

})

export const loginWithGoogle: AsyncThunk<any, any, any> = createAsyncThunk("/auth/google", async (accessToken: any, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/user/login-with-google", { googleAccesToken: accessToken });
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        rejectWithValue(error.message);
    }
});





