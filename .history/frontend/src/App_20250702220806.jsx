import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUsers from "./components/LoginUsers";
import AuthLayout from "./components/AuthLayout";
import RegisterForm from "./components/RegisterForm";
import AdminLayout from "./components/AdminLayout";
import ShowAllDoctors from "./components/ShowAllDoctors";
import AddPharmacy from "./components/AddPharmacy";
import CreateDoctor from "./components/CreateDoctor";
import ShowAllUsers from "./components/ShowAllUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeComponent from "./components/HomeComponent";
import ChatApp from "./components/ChatApp/ChatApp";
import Analytics from "./components/Analytics";
import AppointmentForm from "./components/AppointmentForm";
import MapWithPath from "./components/maps/MapWithPath";
import PrescriptionUpload from "./components/PrescriptionUpload";
import Profile from "./components/profile";
import BlogListPage from "./components/BlogListPage";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";
import DoctorPage from "./components/DoctorDashboard/DoctorPage";
import ViewProfile from "./components/DoctorDashboard/viewProfile";
import Dashboard from "./components/DoctorDashboard/DoctorDashboard";


function App() {
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
          </Route>
        </Route>
        {/* <Route element={<ProtectedRoute allowedRole={["Patient"]} />}> */}
        <Route path="/Home" element={<HomeComponent />}></Route>
        <Route path="/makeAppointment" element={<AppointmentForm />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/myProfile" element={<Profile />}></Route>
        <Route
          path="/uploadPrescription"
          element={<PrescriptionUpload />}
        ></Route>
        <Route path="/listBlogs" element={<BlogListPage />}></Route>
        <Route path="/Chat" element={<ChatApp />}></Route>
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute allowedRole={["Doctor"]} />}> */}
        <Route element={<DoctorPage />}>
          <Route path="/doctor/viewprofile" element={<ViewProfile />}></Route>
          <Route path="/doctor/dashboard" element={<Dashboard />}></Route>
          <Route path="/doctor/patients" element={<View />}></Route>
        </Route>

        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
