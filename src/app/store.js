import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import issueSlice from "../features/Issue/issueSlice";
import projectSlice from "../features/Project/projectSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        issues: issueSlice,
        project: projectSlice
    }
})