import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import CircularProgress from "@mui/material/CircularProgress";
import { verifyToken } from "./services/authService";

// Lazy load all components
const LoginUsers = lazy(() => import("./components/LoginUsers"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const ShowAllDoctors = lazy(() => import("./components/ShowAllDoctors"));
const AddPharmacy = lazy(() => import("./components/AddPharmacy"));
const CreateDoctor = lazy(() => import("./components/CreateDoctor"));
const ShowAllUsers = lazy(() => import("./components/ShowAllUsers"));
const HomeComponent = lazy(() => import("./components/HomeComponent"));
const ChatApp = lazy(() => import("./components/ChatApp/ChatApp"));
const Analytics = lazy(() => import("./components/Analytics"));
const AppointmentForm = lazy(() => import("./components/AppointmentForm"));
const PrescriptionUpload = lazy(() => import("./components/PrescriptionUpload"));
const Profile = lazy(() => import("./components/profile"));
const BlogListPage = lazy(() => import("./components/BlogListPage"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const About = lazy(() => import("./components/About"));
const DoctorPage = lazy(() => import("./components/DoctorDashboard/DoctorPage"));
const ViewProfile = lazy(() => import("./components/DoctorDashboard/viewProfile"));
const Dashboard = lazy(() => import("./components/DoctorDashboard/DoctorDashboard"));
const ViewPatients = lazy(() => import("./components/DoctorDashboard/ViewPatients"));
const GeolocationExample = lazy(() => import("./components/location"));
const CreateBlogs = lazy(() => import("./components/Blogs/createBlogs"));
const AdminProfile = lazy(() => import("./components/AdminProfile"));
const ShowAllPharmacies = lazy(() => import("./components/ShowAllPharmacies"));
const ApproveDoctor = lazy(() => import("./components/ApproveDoctor"));
const ShowAllBlogs = lazy(() => import("./components/Blogs/showAllBlogs"));
const ShowAllBlogsForDoctors = lazy(() => import("./components/Blogs/showAllBlogsForDoctor"));
const Unauthorized = lazy(() => import("./components/Unauthorized"));

import { connectSocket, disconnectSocket } from "./components/utils/SocketInitialize";

function App() {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    userRole: null,
    userData: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const { isValid, role, userData } = await verifyToken(token);
        
        setAuthState({
          isLoading: false,
          isAuthenticated: isValid,
          userRole: role,
          userData
        });

        if (isValid) {
          connectSocket();
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          userRole: null,
          userData: null
        });
      }
    };

    checkAuth();

    return () => {
      if (authState.isAuthenticated) {
        disconnectSocket();
      }
    };
  }, []);

  if (authState.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress size={80} />
        <p className="mt-4">Verifying your session...</p>
      </div>
    );
  }

  return (
    <Router>
      <Suspense fallback={
        <div className="flex flex-col justify-center items-center h-screen">
          <CircularProgress size={80} />
        </div>
      }>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout isAuthenticated={authState.isAuthenticated} />}>
            <Route path="/login" element={<LoginUsers />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Admin protected routes */}
          <Route element={<ProtectedRoute 
            isAuthenticated={authState.isAuthenticated} 
            allowedRoles={["Admin"]} 
            userRole={authState.userRole} 
          />}>
            <Route path="/admin" element={<AdminLayout userData={authState.userData} />}>
              <Route index element={<Navigate to="ShowUsers" replace />} />
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

          {/* Patient protected routes */}
          <Route element={<ProtectedRoute 
            isAuthenticated={authState.isAuthenticated} 
            allowedRoles={["Patient"]} 
            userRole={authState.userRole} 
          />}>
            <Route path="/Home" element={<HomeComponent userData={authState.userData} />} />
            <Route path="/makeAppointment" element={<AppointmentForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/uploadPrescription" element={<PrescriptionUpload />} />
            <Route path="/listBlogs" element={<BlogListPage />} />
            <Route path="/navigatePharmacy" element={<GeolocationExample />} />
            <Route path="/Chat" element={<ChatApp />} />
          </Route>

          {/* Doctor protected routes */}
          <Route element={<ProtectedRoute 
            isAuthenticated={authState.isAuthenticated} 
            allowedRoles={["Doctor"]} 
            userRole={authState.userRole} 
          />}>
            <Route element={<DoctorPage userData={authState.userData} />}>
              <Route path="/doctor/viewprofile" element={<ViewProfile />} />
              <Route path="/doctor/dashboard" element={<Dashboard />} />
              <Route path="/doctor/patients" element={<ViewPatients />} />
              <Route path="/doctor/blog" element={<CreateBlogs />} />
              <Route path="/doctor/showBlog" element={<ShowAllBlogsForDoctors />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/" element={
            authState.isAuthenticated ? 
              <Navigate to="/Home" replace /> : 
              <Navigate to="/login" replace />
          } />
          
          <Route path="*" element={
            authState.isAuthenticated ? 
              <Navigate to="/Home" replace /> : 
              <Navigate to="/login" replace />
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;