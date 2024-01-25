import React, { useReducer, useEffect } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.removeItem("authState");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      const parsedAuthState = JSON.parse(storedAuthState);
      dispatch({ type: "LOGIN", payload: parsedAuthState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const isValid = await sdk.check(state.token);
        if (!isValid) {
          tokenExpireError(dispatch, "TOKEN_EXPIRED");
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    };

    if (state.token) {
      checkTokenValidity();
    }
  }, [state.isAuthenticated, state.token]);

  const login = async (username, password) => {
    try {
      const { user, token, role } = await sdk.login(username, password);
      dispatch({
        type: "LOGIN",
        payload: { user, token, role },
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
