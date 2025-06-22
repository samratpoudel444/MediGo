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


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginUsers />} />
          <Route path="/register" element={<RegisterForm />} />
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
<<<<<<< HEAD
        {/* <Route element={<ProtectedRoute allowedRole={["Patient"]} />}> */}
        <Route path="/Home" element={<HomeComponent />}></Route>
        <Route path="/test" element={<AppointmentForm />}></Route>
        {/* </Route> */}
=======

        <Route path="/Home" element={<HomeComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Footer" element={<Footer />} />
>>>>>>> 6f9840426cc21662df7f14ee5e327f46f6287c14
      </Routes>

    </Router>
  );
}

export default App;