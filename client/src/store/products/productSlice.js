import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../products/asyncAction';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
    },
    reducers: {
        // logout: (state) => {
        //     state.isLoading = false;
        // },
    },
    // Code logic xử lý async action
    extraReducers: (builder) => {
        builder.addCase(actions.getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        // Khi thực hiện action actions thất bại (Promise rejected)
        builder.addCase(actions.getNewProducts.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// eslint-disable-next-line no-empty-pattern
// export const {} = productSlice.actions;

export default productSlice.reducer;
