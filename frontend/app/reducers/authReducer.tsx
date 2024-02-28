import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

interface authState {
    loading: boolean,
    user: Object,
    isAuthenticated: boolean,
}

const initialState: authState = {
    loading: false,
    user: {},
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            state.loading = false;
        },
        setUser: (state, action: PayloadAction<Object>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading, setIsAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;