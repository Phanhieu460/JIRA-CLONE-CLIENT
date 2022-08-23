import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "./constants";
import { setAuthToken } from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
//   useEffect(() => {
//     async function loadUser() {
//       if (localStorage[LOCAL_STORAGE_TOKEN]) {
//         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
//       }
//       try {
//         const response = await axios.get(`${apiUrl}/user/verify`);
//         if (response.data.success) {
//           dispatch({
//             type: "SET_AUTH",
//             payload: { isAuthenticated: true, user: response.data.user },
//           });
//         }
//       } catch (error) {
//         localStorage.removeItem(LOCAL_STORAGE_TOKEN);
//         setAuthToken(null);
//         dispatch({
//           type: "SET_AUTH",
//           payload: { isAuthenticated: false, user: null },
//         });
//       }
//     };
  
//  loadUser()
//   }, [])
  
//   useEffect(() => loadUser(), [])
  const loginUser = async (userLogin) => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, userLogin);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const authContextData = { loginUser, authState};

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
