import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"


export const getToken = createAsyncThunk('token', () => {
    const user = localStorage.getItem('authToken')
    if(user){
        return user
    }else{
        return null
    }
})

export const logout = createAsyncThunk('logout', () => {
    localStorage.removeItem('authToken');
    localStorage.clear()
    toast.success('Logged out')
})



let initialState = {
    token : '',
    searchTerm: '',
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
          state.searchTerm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getToken.pending, (state) => {
          state.loading = true;
        })
        .addCase(getToken.fulfilled, (state,action) => {
         if(action.payload){
          state.token = action.payload;
         }
         state.loading = false
        })
        .addCase(getToken.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(logout.pending, (state) => {
          state.loading = true;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.token = ''
          state.loading = false;
        })
        .addCase(logout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload
        })
    
    }

})

export const { setSearchTerm } = userSlice.actions;

export default userSlice.reducer