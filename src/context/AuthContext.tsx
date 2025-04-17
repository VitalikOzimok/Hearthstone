import React, { createContext, useReducer, ReactNode } from "react";
import { AuthState, AuthAction } from "../types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

const init = (): AuthState => {
  const saved = localStorage.getItem("auth");
  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      user: parsed.user,
      token: parsed.token,
      isAuthenticated: true,
    };
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, init);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
