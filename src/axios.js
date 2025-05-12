import axios from "axios";
import { ErrorToast } from "./components/global/Toaster"; // Import your toaster functions
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const baseUrl = "http://3.144.235.185";

// async function getDeviceFingerprint() {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   console.log(result.visitorId); 
//   return result.visitorId;
// }

const instance = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   devicemodel: await getDeviceFingerprint(),
  //   deviceuniqueid: await getDeviceFingerprint(),
  // },
  timeout: 10000, 
});

instance.interceptors.request.use(async (request) => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const deviceId = result.visitorId;
 
  config.headers['devicemodel'] = deviceId;
  config.headers['deviceuniqueid'] = deviceId;
 
  const token = Cookies.get("token");
    if (!navigator.onLine) {
      // No internet connection
      ErrorToast(
        "No internet connection. Please check your network and try again."
      );
      return;
      // return Promise.reject(new Error("No internet connection"));
    }
  
    // Merge existing headers with token
    request.headers = {
      ...request.headers, // Keep existing headers like devicemodel and deviceuniqueid
      Accept: "application/json, text/plain, */*",
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
    };
  
    return request;

});

// instance.interceptors.request.use((request) => {
//   const token = Cookies.get("token");
//   if (!navigator.onLine) {
//     // No internet connection
//     ErrorToast(
//       "No internet connection. Please check your network and try again."
//     );
//     return;
//     // return Promise.reject(new Error("No internet connection"));
//   }

  // Merge existing headers with token
//   request.headers = {
//     ...request.headers, // Keep existing headers like devicemodel and deviceuniqueid
//     Accept: "application/json, text/plain, */*",
//     ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
//   };

//   return request;
// });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    // if (error.response && error.response.status === 401) {
    //   // Unauthorized error
    //   Cookies.remove("token");
    //   Cookies.remove("user");
    //   ErrorToast("Session expired. Please relogin");
    //   window.location.href = "/";
    // }

    return Promise.reject(error);
  }
);

export default instance;
