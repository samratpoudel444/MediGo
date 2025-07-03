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

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginUsers />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="'/forgotPassword" element={}></Route>
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
        <Route path="/myProfile" element={<Profile />}></Route>
        <Route
          path="/uploadPrescription"
          element={<PrescriptionUpload />}
        ></Route>
        <Route
          path="/listBlogs"
          element={<BlogListPage />}
        ></Route>
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
