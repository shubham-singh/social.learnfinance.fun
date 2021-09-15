import { createSlice } from "@reduxjs/toolkit"

interface SnackbarState {
    visible: boolean,
    message: string
}

const initialState: SnackbarState = {
    visible: false,
    message: ""
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.visible = true;
            state.message = action.payload
        },
        deleteSnackbar: (state) => initialState
    }
})

export const { showSnackbar, deleteSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;