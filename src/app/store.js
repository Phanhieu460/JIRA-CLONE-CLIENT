import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "../features/issueSlice";
import userReducer from '../features/userSlice'



export default configureStore({
    reducer: {
        user: userReducer,
        issue: issueReducer
    }
})