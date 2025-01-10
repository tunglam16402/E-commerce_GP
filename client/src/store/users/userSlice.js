import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../users/asyncAction';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        message: '',
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.current = null;
            state.token = null;
            state.isLoading = false;
            state.message = '';
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
    // Code logic xử lý async action
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });

        // Khi thực hiện action actions thất bại (Promise rejected)
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.message = 'Your session has expired. Please log in again.';
        });
    },
});

export const { login, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
