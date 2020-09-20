import {
  GET_STICKINGS,
  START_EXERCISE,
  PREVIOUS_EXERCISE,
  NEXT_EXERCISE,
  RANDOM_EXERCISE,
  RANDOM_SBC_EXERCISE,
  RANDOM_FLAM_EXERCISE,
  INVERT_EXERCISE,
  SEARCH_EXERCISE,
  CHANGE_EXERCISE,
} from "../actionTypes";
export const getStickings = (stickings) => ({
  type: GET_STICKINGS,
  payload: stickings,
});

export const startExercise = () => ({
  type: START_EXERCISE,
});

export const previousExercise = () => ({
  type: PREVIOUS_EXERCISE,
});
export const nextExercise = () => ({
  type: NEXT_EXERCISE,
});

export const randomExercise = () => ({
  type: RANDOM_EXERCISE,
});

export const randomSBCExercise = () => ({
  type: RANDOM_SBC_EXERCISE,
});

export const randomFlamExercise = () => ({
  type: RANDOM_FLAM_EXERCISE,
});

export const invertExercise = () => ({
  type: INVERT_EXERCISE,
});

export const searchExercise = (search) => ({
  type: SEARCH_EXERCISE,
  payload: search,
});

export const changeExercise = (exercise) => ({
  type: CHANGE_EXERCISE,
  payload: exercise,
});
