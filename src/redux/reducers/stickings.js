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

const initialState = {
  singleBeatCombinations: [],
  flamBeats: [],
  section: "Single Beat Combinations",
  pattern: {},
};

const stickingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STICKINGS:
      return {
        ...state,
        singleBeatCombinations: action.payload.sbcs,
        flamBeats: action.payload.fbs,
      };
    case START_EXERCISE:
      switch (state.section) {
        case "Single Beat Combinations":
          return {
            ...state,
            pattern: state.singleBeatCombinations[0],
          };
        case "Flam Beats":
          return {
            ...state,
            pattern: state.flamBeats[0],
          };
      }
      break;
    case PREVIOUS_EXERCISE:
      switch (state.section) {
        case "Single Beat Combinations":
          if (state.pattern.exercise !== 1) {
            return {
              ...state,
              pattern: state.singleBeatCombinations[state.pattern.exercise - 2],
            };
          } else {
            return state;
          }

        case "Flam Beats":
          if (state.pattern.exercise !== 1) {
            return {
              ...state,
              pattern: state.flamBeats[state.pattern.exercise - 2],
            };
          } else {
            return state;
          }

        default:
          return state;
      }
    case NEXT_EXERCISE:
      switch (state.section) {
        case "Single Beat Combinations":
          if (state.pattern.exercise < state.singleBeatCombinations.length) {
            return {
              ...state,
              pattern: state.singleBeatCombinations[state.pattern.exercise],
            };
          } else {
            return state;
          }

        case "Flam Beats":
          if (state.pattern.exercise < state.flamBeats.length) {
            return {
              ...state,
              pattern: state.flamBeats[state.pattern.exercise],
            };
          } else {
            return state;
          }

        default:
          return state;
      }

    case RANDOM_EXERCISE:
      const allExercises = [
        ...state.singleBeatCombinations,
        ...state.flamBeats,
      ];
      const allExercisesRandomIndex = Math.floor(
        Math.random() * allExercises.length
      );
      return {
        ...state,
        pattern: allExercises[allExercisesRandomIndex],
        section: allExercises[allExercisesRandomIndex].section,
      };
    case RANDOM_SBC_EXERCISE:
      const randomSBCRandomIndex = Math.floor(
        Math.random() * state.singleBeatCombinations.length
      );
      return {
        ...state,
        pattern: state.singleBeatCombinations[randomSBCRandomIndex],
        section: state.singleBeatCombinations[randomSBCRandomIndex].section,
      };
    case RANDOM_FLAM_EXERCISE:
      const randomFlamRandomIndex = Math.floor(
        Math.random() * state.flamBeats.length
      );
      return {
        ...state,
        pattern: state.flamBeats[randomFlamRandomIndex],
        section: state.flamBeats[randomFlamRandomIndex].section,
      };
    case INVERT_EXERCISE:
      const sticking = state.pattern.sticking;
      let stickingArray = sticking.split("");
      for (let [i, letter] of stickingArray.entries()) {
        switch (letter) {
          case "R":
            stickingArray[i] = "L";
            break;
          case "L":
            stickingArray[i] = "R";

            break;
          case "F":
            stickingArray[i] = "C";

            break;
          case "C":
            stickingArray[i] = "F";

            break;

          default:
            break;
        }
      }
      const invertedSticking = stickingArray.join("");
      const currentPattern = { ...state.pattern };
      currentPattern.sticking = invertedSticking;

      let measure1Inverted;
      switch (currentPattern.count) {
        // Base Patterns
        case "1+2+3+4+|1+2+3+4+":
        case "F+aF+a|F+aF+a":
        case "Fe+aFe+a|Fe+aFe+a":
        case "Fe+aFe+a|FeFaFeFa":
        case "FeFaFeFa|Fe+aFe+a":
        case "FeFaFeFa|FeFaFeFa":
          measure1Inverted = currentPattern.sticking.slice(
            0,
            sticking.length / 2
          );
          break;
        case "F+aF+a|Fe+aFe+a":
        case "F+aF+a|FeFaFeFa":
          measure1Inverted = currentPattern.sticking.slice(0, 6);
          break;

        // Mixes
        // 2/4
        case "Fe+aFe+a|F+aF+a":
        case "FeFaFeFa|F+aF+a":
        // 4/4 + 2/4
        case "1+2+3+4+|F+aF+a":
        case "1+2+3+4+|Fe+aFe+a":
        case "1+2+3+4+|FeFaFeFa":
          measure1Inverted = currentPattern.sticking.slice(0, 8);
          break;
        // 2/4 + 4/4
        case "F+aF+a|1+2+3+4+":
          measure1Inverted = currentPattern.sticking.slice(0, 6);
          break;
        case "Fe+aFe+a|1+2+3+4+":
        case "FeFaFeFa|1+2+3+4+":
          measure1Inverted = currentPattern.sticking.slice(
            0,
            sticking.length / 2
          );
          break;
        default:
          break;
      }

      const measure2Inverted = currentPattern.sticking.slice(
        measure1Inverted.length,
        sticking.length
      );

      currentPattern.measure1.sticking = measure1Inverted;
      currentPattern.measure2.sticking = measure2Inverted;
      currentPattern.inverted = !currentPattern.inverted;
      switch (measure1Inverted.charAt(0)) {
        case "R":
          currentPattern.measure1.lead = "R";
          break;
        case "F":
          currentPattern.measure1.lead = "R";

          break;
        case "L":
          currentPattern.measure1.lead = "L";

          break;
        case "C":
          currentPattern.measure1.lead = "L";

          break;

        default:
          return state;
      }
      switch (measure2Inverted.charAt(0)) {
        case "R":
          currentPattern.measure2.lead = "R";
          break;
        case "F":
          currentPattern.measure2.lead = "R";

          break;
        case "L":
          currentPattern.measure2.lead = "L";

          break;
        case "C":
          currentPattern.measure2.lead = "L";

          break;

        default:
          return state;
      }
      return {
        ...state,
        pattern: currentPattern,
      };
    case SEARCH_EXERCISE:
      switch (state.section) {
        case "Single Beat Combinations":
          return {
            ...state,
            pattern: state.singleBeatCombinations[action.payload - 1],
          };
        case "Flam Beats":
          return {
            ...state,
            pattern: state.flamBeats[action.payload - 1],
          };

        default:
          return state;
      }
    case CHANGE_EXERCISE:
      return {
        ...state,
        pattern: action.payload,
        section: action.payload.section,
      };
    default:
      return state;
  }
};

export default stickingsReducer;
