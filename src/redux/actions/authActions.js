import { REGISTER_USER, SIGN_IN, SIGN_OUT } from "../actionTypes";

export const registerUser = (email, password) => ({
  type: REGISTER_USER,
  payload: { email, password },
});

export const signIn = (email, password) => ({
  type: SIGN_IN,
  payload: { email, password },
});

export const signOut = () => ({
  type: SIGN_OUT,
});
