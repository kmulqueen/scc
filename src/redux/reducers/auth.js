import { appAuth } from "../../firebase";
import { REGISTER_USER, SIGN_IN, SIGN_OUT } from "../actionTypes";
import { signIn } from "../actions/authActions";

const initialState = {
  user: {},
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      let registerUser = async () => {
        const regCred = await appAuth.createUserWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        );
        console.log(regCred.user);
        return {
          ...state,
        };
      };
      registerUser();
      return {
        ...state,
      };
    case SIGN_IN:
      let signInUser = async () => {
        const signInCred = await appAuth.signInWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        );
        console.log(signInCred.user);
      };
      signInUser();
      return {
        ...state,
      };

    case SIGN_OUT:
      let signOutUser = async () => {
        await appAuth.signOut();
        console.log("user signed out");
      };
      signOutUser();
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
