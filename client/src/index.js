import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";

import Login from "./components/Login/Login";
import HomePage from "./components/Home/Home";
import ViewIdeas from "./components/ViewIdeas/ViewIdeas";
import WriteIdea from "./components/WriteIdea/WriteIdea";
import ManagementUsers from "./components/ManagementUsers/ManagementsUsers";
import ManagementIdeas from "./components/ManagementIdeas/ManagementIdeas";
import SettingProfiles from "./components/SettingProfiles/SettingProfiles";
import UpdateProfile from "./components/SettingProfiles/UpdateProfile";
import Dashboard from "./components/Dashboard/Dashboard";

//ContextProvider
import AuthContextProvider from "./contexts/AuthContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import DepartmentContextProvider from "./contexts/DepartmentContext";
import BlogContextProvider from "./contexts/BlogContext";

//departments
import DepartmentsManagement from "./components/DepartmentsManagement/DepartmentsManagement";
import AddNewDepart from "./components/DepartmentsManagement/AddNewDepart/AddNewDepart";
import UpdateDepart from "./components/DepartmentsManagement/UpdateDepartment/UpdateDepartment";

//categories
import CategoriesManagement from "./components/CategoriesManagement/CategoriesManagement";
import AddNewCategory from "./components/CategoriesManagement/AddNewCategory/AddNewCategory";
import UpdateCategory from "./components/CategoriesManagement/UpdateCategory";

//page not found
import PageNotFound from "./pages/404Page";

//routeProtected
import ProtectedRoutes from "./components/route/ProtectedRoutes/ProtectedRoutes";

//users
import AddNewUser from "./components/ManagementUsers/AddNewUser";
import UpdateUser from "./components/ManagementUsers/UpdateUser";
import UpdatePass from "./components/ManagementUsers/UpdatePass";
import ViewDetail from "./components/ManagementUsers/ViewDetail";
import CommentContextProvider from "./contexts/CommentContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DepartmentContextProvider>
          <CategoryContextProvider>
            <BlogContextProvider>
              <CommentContextProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                  {/* <Route path="login" element={<Login />} /> */}
                  <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="home" element={<HomePage />}>
                      <Route
                        path="/home"
                        element={<Navigate replace to="management-user" />}
                      />
                      {/*dashboard */}
                      <Route path="management-user" element={<Dashboard />} />

                      {/* ideas */}
                      <Route path="view-ideas" element={<ViewIdeas />} />
                      <Route path="write-idea" element={<WriteIdea />} />
                      <Route
                        path="management-ideas"
                        element={<ManagementIdeas />}
                      />

                      {/* users */}
                      <Route
                        path="management-attendance"
                        element={<ManagementUsers />}
                      />
                      <Route path="update-user/:_id" element={<UpdateUser />} />
                      <Route path="update-pass/:_id" element={<UpdatePass />} />
                      <Route path="ViewDetail/:_id" element={<ViewDetail />} />
                      <Route path="register-user" element={<AddNewUser />} />

                      {/* department */}
                      <Route
                        path="departments"
                        element={<DepartmentsManagement />}
                      />
                      <Route path="new-department" element={<AddNewDepart />} />
                      <Route
                        path="update-department/:_id"
                        element={<UpdateDepart />}
                      />

                      {/* categories */}
                      <Route
                        path="categories"
                        element={<CategoriesManagement />}
                      />
                      <Route path="new-category" element={<AddNewCategory />} />
                      <Route
                        path="update-category/:id"
                        element={<UpdateCategory />}
                      />

                      <Route
                        path="setting-profiles"
                        element={<SettingProfiles />}
                      />
                      <Route
                        path="update-profile"
                        element={<UpdateProfile />}
                      />
                    </Route>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </CommentContextProvider>
            </BlogContextProvider>
          </CategoryContextProvider>
        </DepartmentContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
