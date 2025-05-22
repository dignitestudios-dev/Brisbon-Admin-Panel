// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router";
// import Cookies from "js-cookie";
// import { ErrorToast } from "../components/global/Toaster";

// function ProtectedRoute({ children }) {
//   const token = Cookies.get("token");

//   if (!token) {
//     const errorHandler = (msg) => {
//       ErrorToast(msg);
//       return
//     }
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         {errorHandler("Access Denied! Please login first.")}
//         <Navigate to="/auth/login" replace />
//       </div>
//     );
//   }

//   return children;
// }

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
