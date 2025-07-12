import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import CircularProgress from "@mui/material/CircularProgress";

// Regular imports (no lazy loading)
import LoginUsers from "./components/LoginUsers";
import RegisterForm from "./components/RegisterForm";
import AdminLayout from "./components/AdminLayout";
import ShowAllDoctors from "./components/ShowAllDoctors";
import AddPharmacy from "./components/AddPharmacy";
import CreateDoctor from "./components/CreateDoctor";
import ShowAllUsers from "./components/ShowAllUsers";
import HomeComponent from "./components/HomeComponent";
import ChatApp from "./components/ChatApp/ChatApp";
import Analytics from "./components/Analytics";
import AppointmentForm from "./components/AppointmentForm";
import PrescriptionUpload from "./components/PrescriptionUpload";
import Profile from "./components/profile";
import BlogListPage from "./components/BlogListPage";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";
import DoctorPage from "./components/DoctorDashboard/DoctorPage";
import ViewProfile from "./components/DoctorDashboard/viewProfile";
import Dashboard from "./components/DoctorDashboard/DoctorDashboard";
import ViewPatients from "./components/DoctorDashboard/ViewPatients";
import GeolocationExample from "./components/location";
import CreateBlogs from "./components/Blogs/createBlogs";
import AdminProfile from "./components/AdminProfile";
import ShowAllPharmacies from "./components/ShowAllPharmacies";
import ApproveDoctor from "./components/ApproveDoctor";
import ShowAllBlogs from "./components/Blogs/showAllBlogs";
import ShowAllBlogsForDoctors from "./components/Blogs/showAllBlogsForDoctor";

import {
  connectSocket,
  disconnectSocket,
} from "./components/utils/SocketInitialize";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const timer = setTimeout(() => {
        connectSocket();
      }, 500);

      return () => {
        clearTimeout(timer);
        disconnectSocket();
      };
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginUsers />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole={["Admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="ShowUsers" element={<ShowAllUsers />} />
            <Route path="ShowDoctors" element={<ShowAllDoctors />} />
            <Route path="CreateDoctor" element={<CreateDoctor />} />
            <Route path="AddPharmacy" element={<AddPharmacy />} />
            <Route path="ViewAnalytics" element={<Analytics />} />
            <Route path="approveDoctor" element={<ApproveDoctor />} />
            <Route path="ShowAllPharmacies" element={<ShowAllPharmacies />} />
            <Route path="blogs" element={<CreateBlogs />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="showAllBlogs" element={<ShowAllBlogs />} />
          </Route>
        </Route>

        <Route path="/Home" element={<HomeComponent />} />
        <Route path="/makeAppointment" element={<AppointmentForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/myProfile" element={<Profile />} />
        <Route path="/uploadPrescription" element={<PrescriptionUpload />} />
        <Route path="/listBlogs" element={<BlogListPage />} />
        <Route path="/navigatePharmacy" element={<GeolocationExample />} />
        <Route path="/Chat" element={<ChatApp />} />

        <Route element={<DoctorPage />}>
          <Route path="/doctor/viewprofile" element={<ViewProfile />} />
          <Route path="/doctor/dashboard" element={<Dashboard />} />
          <Route path="/doctor/patients" element={<ViewPatients />} />
          <Route path="/doctor/blog" element={<CreateBlogs />} />
          <Route path="/doctor/showBlog" element={<ShowAllBlogsForDoctors />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
