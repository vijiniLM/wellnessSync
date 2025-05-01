import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data"); // No token or headers needed
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      // Handle the error if it occurs
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const updateUserData = async (payload) => {
    try {
      // Use a differently named variable (response) to avoid conflicts
      const response = await axios.put(
        backendUrl + "/api/auth/update-user",
        payload
      );
      if (response.data.success) {
        // Since the updated user data is not returned,
        // fetch the fresh user data from the backend.
        await getUserData();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const changePassword = async (payload) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/auth/change-password",
        payload
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    updateUserData,
    changePassword
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
