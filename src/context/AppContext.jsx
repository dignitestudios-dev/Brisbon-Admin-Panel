import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
// import { useEffect } from "react";
// import { onMessageListener } from "../firebase/messages";
// import getFCMToken from "../firebase/getFcmToken";
import Cookies from "js-cookie";
import axios from "../axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Send fcm to backend:
  // const fetchToken = async () => {
  //   const token = await getFCMToken();
  //   const authToken = Cookies.get("token");
  //   if (!authToken) {
  //     ErrorToast("Un authorized | Please relogin.");
  //     navigate("/login");
  //   } else if (authToken && token) {
  //     const response = await axios.post(`/auth/updateFCM`, {
  //       fcmToken: token,
  //     });
  //   }

  // You can send this token to your server or use it as needed

  // onMessageListener()
  //   .then((payload) => {
  //     const data = JSON.parse(payload?.data?.data);
  //     let route = null;
  //     if (data?.type == "booking") {
  //       route = `/rental-tracking/${data?.booking?._id}`;
  //     } else if (data?.type == "product") {
  //       route = `/products/${data?.product?._id}`;
  //     } else if (data?.type == "chat") {
  //       route = `/messages/${data?.chatUser?.chatId}`;
  //     } else {
  //       // WarningToast("Can't route. Something went wrong.");
  //       return;
  //     }
  //     NotificationToast({
  //       title: payload.notification.title,
  //       message: payload.notification.body,
  //       route: route,
  //     });
  //   })
  //   .catch((err) => console.log("failed: ", err));



  const navigate = useNavigate();

  const [token, setToken] = useState(() => Cookies.get("token"));
  const [userData, setUserData] = useState(Cookies.get("name"));

  const loginAuth = (data) => {
    console.log("Login data:", data); 
    if (data) {
      Cookies.set("token", data?.token);
      // Cookies.set("name", JSON.stringify(data?.data));

      setToken(data?.token);
      // setUserData(data?.data);
    }
  };

  const logoutAuth = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    setToken(null);
    setUserData(null);
    navigate("/login");
  };

  
  const dummyVar = null;

  return (
    <AppContext.Provider
      value={{
        dummyVar,
        logoutAuth,
        loginAuth,
        token
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
   const AppContext = useContext(AppContext);
   return AppContext;
   
};

export default useApp;
