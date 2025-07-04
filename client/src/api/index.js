import axios from 'axios' ;
const BaseURL = "http://localhost:4000/";

export const ValidateUser = async (token) => {
    try {
        const res = await axios.get(`${BaseURL}api/users/login`,{
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data;
    } catch (error) {
        return null;
    }
};

// Api function  to fetch all users from the Backend 
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${BaseURL}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
};

// Api function  to fetch all users from the Backend 
export const getAllRecites = async () => {
    try {
        const res = await axios.get(`${BaseURL}api/Recites/getALL`);
        return res.data;
    } catch (error) {
        return null;
    } 
};

// Api function  to fetch all Podcasts from the Backend 
export const getAllPodcasts = async () => {
  try {
      const res = await axios.get(`${BaseURL}api/Podcasts/getALL`);
      return res.data;
  } catch (error) {
      return null;
  } 
};

// Api function  to fetch all users from the Backend 
export const getAllReciters = async () => {
    try {
        const res = await axios.get(`${BaseURL}api/Reciters/getALL`);
        return res.data;
    } catch (error) {
        return null;
    }
};

// Api function  to fetch all users from the Backend 
export const getAllPodcasters = async () => {
  try {
      const res = await axios.get(`${BaseURL}api/Podcasters/getALL`);
      return res.data;
  } catch (error) {
      return null;
  }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${BaseURL}api/Albums/getALL`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
      const res = axios.delete(`${BaseURL}api/users/delete/${userId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const removeRecite = async (reciteId) => {
    try {
      const res = axios.delete(`${BaseURL}api/Recites/delete/${reciteId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const removePodcast = async (podcastId) => {
    try {
      const res = axios.delete(`${BaseURL}api/Podcatsts/delete/${podcastId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const removeReciter = async (reciterId) => {
    try {
      const res = axios.delete(`${BaseURL}api/Reciters/delete/${reciterId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const removePodcaster = async (podcasterId) => {
    try {
      const res = axios.delete(`${BaseURL}api/Podcasters/delete/${podcasterId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const removeAlbum = async (AlbumId) => {
    try {
      const res = axios.delete(`${BaseURL}api/Albums/delete/${AlbumId}`);
      return res;
    } catch (error) {
      return null;
    }
  };

  export const changingUserRole = async (userId, role) => {
    try {
      const res = axios.put(`${BaseURL}api/users/updateRole/${userId}`, {
        data: { role: role },
      });
      return res;
    } catch (error) {
      return null;
    }
  };

  export const saveNewReciter = async (data) => {
    try {
      const res = axios.post(`${BaseURL}api/Reciters/save`, { ...data });
      return (await res).data.reciter;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewAlbum = async (data) => {
    try {
      const res = axios.post(`${BaseURL}api/albums/save`, { ...data });
      return (await res).data.album;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewRecite = async (data) => {
    try {
      const res = axios.post(`${BaseURL}api/Recites/save`, { ...data });
      return (await res).data.recite;
    } catch (error) {
      return null;
    }
  };

  export const saveNewPodcast = async (data) => {
    try {
      const res = axios.post(`${BaseURL}api/Podcasts/save`, { ...data });
      return (await res).data.podcast;
    } catch (error) {
      return null;
    }
  };

  export const saveNewPodcaster = async (data) => {
    try {
      const res = axios.post(`${BaseURL}api/Podcasters/save`, { ...data });
      return (await res).data.podcaster;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteRecite = async (id) => {
    try {
      const res = axios.delete(`${BaseURL}api/Recites/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };


