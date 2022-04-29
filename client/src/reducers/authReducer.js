// export const authReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "SET_AUTH":
//       return {
//         ...state,
//         Users: payload,
//         authLoading: false,
//       };
//     case "USERS_LOAD_SUCCESS":
//       return {
//         ...state,
//         Users: payload,
//         Users: action.payload,
//       };
//     case "ADD_NEW_USER":
//       return {
//         ...state,
//         Users: [...state.Users, payload],
//         authLoading: false,
//       };
//     case "USERS_LOAD_FAIL":
//       return {
//         ...state,
//         Users: [],
//         authLoading: false,
//       };
//     default:
//       return state;
//   }
// };

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        user: payload,
        authLoading: false,
      };
    case "USERS_LOAD_SUCCESS":
      return {
        ...state,
        Users: action.payload,
      };
    case "ALLUSERS_LOAD_SUCCESS":
      return {
        ...state,
        AllUsers: action.payload,
      };
    case "TIME_LOAD_SUCCESS":
      return {
        ...state,
        datatime: action.payload.datatime,
        title: action.payload.title,
        timeloading: false,
      };
    case "GET_A_USER":
      return {
        ...state,
        user: payload,
      };
    case "USERS_LOAD_FAIL":
      return {
        ...state,
        Users: [],
        authLoading: false,
      };
    case "ALLUSERS_LOAD_FAIL":
      return {
        ...state,
        AllUsers: [],
        authLoading: false,
      };
    default:
      return state;
  }
};
