import { appAuth, db } from "../../firebase";
import { REGISTER_USER, SIGN_IN, SIGN_OUT } from "../actionTypes";

const initialState = {
  isAuthorized: false,
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
        // const sbcs = await db.collection("singleBeatCombinations").get();
        // const fbs = await db.collection("flamBeats").get();
        // const initSBCS = [];
        // const initFBS = [];
        // sbcs.forEach((exercise) => {
        //   const newSBCItem = { ...exercise.data(), id: exercise.id };
        //   initSBCS.push(newSBCItem);
        // });
        // fbs.forEach((exercise) => {
        //   const newFBItem = { ...exercise.data(), id: exercise.id };
        //   initFBS.push(newFBItem);
        // });
        await db
          .collection("users")
          .doc(regCred.user.uid)
          .set({
            displayName: action.payload.username,
            username: action.payload.username,
            stickings: {
              // singleBeatCombinations: initSBCS,
              // flamBeats: initFBS,
              singleBeatCombinations: [],
              flamBeats: [],
              customPlaylists: {
                leftHandWorkout: [],
                funFlamExercises: [],
              },
              bookmarks: [],
            },
            posts: {
              starred: [],
              created: [],
            },
          });

        const query = db.collection("users").doc(regCred.user.uid);
        const newUser = await query.get();
        return {
          ...newUser.data(),
        };
      };

      let updateState = {};
      registerUser().then((val) => (updateState = val));
      console.log(updateState);

    // return {
    //   updateState,
    // };
    case SIGN_IN:
      let signInUser = async () => {
        const { user } = await appAuth.signInWithEmailAndPassword(
          action.payload.email,
          action.payload.password
        );
        if (user) {
          return {
            ...state,
            isAuthorized: true,
            user,
          };
        } else {
          return state;
        }
      };
      signInUser();

    // return {
    //   ...state,
    // };

    case SIGN_OUT:
      let signOutUser = async () => {
        await appAuth.signOut();
      };
      signOutUser();
      return {
        ...state,
        isAuthorized: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
