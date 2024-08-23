export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_RECITERS: "SET_ALL_RECITERS",
    SET_ALL_RECITES: "SET_ALL_RECITES",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case actionType.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case actionType.SET_ALL_USERS:
        return {
          ...state,
          allUsers: action.allUsers,
        };
      case actionType.SET_ALL_RECITERS:
        return {
          ...state,
          allReciters: action.allReciters, // Fixed: Correctly update allReciters
        };
      case actionType.SET_ALL_RECITES:
        return {
          ...state,
          allRecites: action.allRecites, // Fixed: Correctly update allRecites
        };
      case actionType.SET_ALL_ALBUMS:
        return {
          ...state,
          allAlbums: action.allAlbums, // Fixed: Correctly update allAlbums
        };
        
      default:
        return state;
    }
  };
  
  export default reducer;
  