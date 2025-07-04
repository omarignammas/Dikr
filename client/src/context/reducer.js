export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_RECITERS: "SET_ALL_RECITERS",
    SET_ALL_RECITES: "SET_ALL_RECITES",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
    SET_RECITER_FILTER: "SET_RECITER_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_AUDIO_PLAYING: "SET_AUDIO_PLAYING",
    SET_MINI_PLAYER:"SET_MINI_PLAYER",
    SET_AUDIO:"SET_AUDIO",
    SET_SEARCH_TERM:"SET_SEARCH_TERM",
    SET_ALL_PODCASTERS:"SET_ALL_PODCASTERS",
    SET_ALL_PODCASTS:"SET_ALL_PODCASTS",
    SET_PODCASTER_FILTER: "SET_PODCASTER_FILTER",
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
          allReciters: action.allReciters, 
        };
      case actionType.SET_ALL_RECITES:
        return {
          ...state,
          allRecites: action.allRecites, 
        };
      case actionType.SET_ALL_ALBUMS:
        return {
          ...state,
          allAlbums: action.allAlbums,
        };
      case actionType.SET_ALL_PODCASTS:
          return {
            ...state,
            allPodcasts: action.allPodcasts, 
          };
      case actionType.SET_ALL_PODCASTERS:
            return {
              ...state,
              allPodcasters: action.allPodcasters, 
            };
      case actionType.SET_PODCASTER_FILTER:
              return {
                ...state,
                podcasterFilter: action.podcasterFilter, 
              };
      case actionType.SET_RECITER_FILTER:
          return {
            ...state,
            reciterFilter: action.reciterFilter, 
          };
      case actionType.SET_LANGUAGE_FILTER:
            return {
              ...state,
              languageFilter: action.languageFilter, 
            };
      case actionType.SET_ALBUM_FILTER:
        return {
          ...state,
          albumFilter: action.albumFilter, 
        };
      case actionType.SET_FILTER_TERM:
          return {
            ...state,
            filterTerm: action.filterTerm, 
          };
      case actionType.SET_AUDIO_PLAYING:
            return {
              ...state,
              isAudioPlaying: action.isAudioPlaying, 
            };
      case actionType.SET_MINI_PLAYER:
              return {
                ...state,
                miniPlayer: action.miniPlayer, 
              };
      case actionType.SET_AUDIO:
                return {
                  ...state,
                  audio: action.audio, 
                };
      case actionType.SET_SEARCH_TERM:
                  return {
                    ...state,
                    searchTerm: action.searchTerm, 
                  }; 
        
      default:
        return state;
    }
  };
  
  export default reducer;
  