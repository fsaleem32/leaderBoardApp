import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  console.log(role, 'role')
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
  }
}

function Main() {
  const state = React.useContext(AuthContext);
  console.log(React.useContext(AuthContext))
  console.log(state, 'state')
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {state?.state.isAuthenticated
              ? renderRoutes(state?.state?.user?.role)
              : renderRoutes("none")}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
