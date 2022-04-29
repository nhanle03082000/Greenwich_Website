import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: "",
    role: null,
    Users: [],
    datatime: {},
    title: [],
    accessToken: "",
    timeloading: true,
    AllUsers: [],
  });

  //login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      console.log("data", response.data.data.email);
      if (response.data.token)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);

      if (response.data.data.email) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            user: response.data.data.email,
            role: response.data.data.role,
          },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // const addNewUser = async (userForm) => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/auth/register`, userForm);
  //     console.log("data", response.data);
  //     if (response) dispatch({ type: "ADD_NEW_USER", payload: response.data });
  //     return response;
  //   } catch (error) {
  //     if (error.response.data) return error.response.data;
  //     else return { success: false, message: "Server Error" };
  //   }
  // };

  const addNewUser = async (userForm) => {
    const response = await axios.post(`${apiUrl}/auth/register`, userForm);
    console.log("register response", response.data);
    return response.data;
  };

  const getAllUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/information`);
      console.log("dfasdfasdf", response.data.data.all_users);
      if (response.data.data.all_users) {
        dispatch({
          type: "USERS_LOAD_SUCCESS",
          payload: response.data.data.all_users,
        });
      } else {
        dispatch({ type: "USERS_LOAD_FAIL" });
      }
    } catch (error) {}
  };

  const getAllUser1 = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      console.log("user1", response.data.users);
      if (response.data.users) {
        dispatch({
          type: "ALLUSERS_LOAD_SUCCESS",
          payload: response.data.users,
        });
      } else {
        dispatch({ type: "ALLUSERS_LOAD_FAIL" });
      }
    } catch (error) {}
  };

  const getTime = async (_id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/information/getAlltime/` + _id
      );
      console.log("data giờ và zcvxzxcvngày", response.data.data);
      if (response.data.data) {
        let result = response.data.data;
        let lsHisTitle = [];
        Object.keys(result).forEach((key) => {
          lsHisTitle.push(key);
        });
        dispatch({
          type: "TIME_LOAD_SUCCESS",
          payload: {
            datatime: result,
            title: lsHisTitle,
            timeloading: false,
          },
        });
      } else {
        dispatch({ type: "USERS_LOAD_FAIL" });
      }
    } catch (error) {}
  };

  const deleteUser = async (_id) => {
    const response = await axios.delete(`${apiUrl}/auth/deleteUser/` + _id);
    console.log("delete res", response);
  };
  const updateUser = async (_id, userForm) => {
    const response = await axios.put(`${apiUrl}/auth/update/` + _id, userForm);
    console.log("update", response);
    return response;
  };
  const updatePass = async (_id, userForm) => {
    const response = await axios.put(
      `${apiUrl}/auth/update_pass/` + _id,
      userForm
    );
    console.log("update", response);
    return response;
  };
  const getUserId = async (_id) => {
    try {
      const response = await axios.get(`${apiUrl}/auth/aUser/` + _id);
      console.log("data depart get: ", response.data.a_user);
      if (response.data.a_user) {
        dispatch({
          type: "GET_A_USER",
          payload: response.data.a_user,
        });
      }
    } catch (error) {
      dispatch({ type: "GET_DEPARTMENT_FAIL" });
    }
  };
  //context Data
  const authContextData = {
    authState,
    loginUser,
    getAllUser,
    addNewUser,
    deleteUser,
    updateUser,
    getAllUser1,
    updatePass,
    getUserId,
  };

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
