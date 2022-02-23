import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const admin = {
  _id: "62043438f8e9adce483d3c2d",
  username: "kat",
  email: "kat@gmail.com",
  profilePicture: "",
  coverPicture: "",
  followers: [
    "62043458f8e9adce483d3c31",
    "6204344cf8e9adce483d3c2f"
  ],
  following: [
    "6204344cf8e9adce483d3c2f",
    "62043458f8e9adce483d3c31"
  ],
  isAdmin: false,
  createdAt: "2022-02-09T21:38:00.654Z",
  __v: 0
}

const INITIAL_STATE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user: admin,
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value={{ 
        user: state.user, 
        isFetching: state.isFetching, 
        error: state.error,
        dispatch
      }}>{children}</AuthContext.Provider>
  )
}