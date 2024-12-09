import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../apis';

export const getCategories = createAsyncThunk('app/categories', async (data, { RejectedWithValue }) => {
    const response = await apis.apiGetCategories();
    if (!response.success) {
        return RejectedWithValue(response);
    }
    return response.productCategories;
});
