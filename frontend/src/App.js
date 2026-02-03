import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ReceptionDashboard from "./pages/receptionist/ReceptionDashboard";
import PatientManagement from "./pages/patient/PatientManagement";
import DoctorConsultation from "./pages/doctor/DoctorConsultation";
import TherapyScheduler from "./pages/therapy/TherapyScheduler";
import Billing from "./pages/receptionist/Billing";
import UserManagement from "./pages/admin/UserManagement";
import ReceptionTherapyManagement from "./pages/receptionist/ReceptionTherapyManagement";
import ForgotPassword from "./pages/auth/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/doctor" element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/reception" element={
          <ProtectedRoute role="receptionist">
            <ReceptionDashboard />
          </ProtectedRoute>
        } />

        <Route path="/patients" element={
          <ProtectedRoute role="receptionist">
            <PatientManagement />
          </ProtectedRoute>
        }/>

        <Route path="/consultation" element={
          <ProtectedRoute role="doctor">
            <DoctorConsultation />
          </ProtectedRoute>
        }/>

        <Route path="/therapy"element={
          <ProtectedRoute role="receptionist">
            <TherapyScheduler />
          </ProtectedRoute>
        }/>

        <Route path="/billing"element={
          <ProtectedRoute role="receptionist">
            <Billing />
          </ProtectedRoute>
        }/>

        <Route path="/admin/users"element={
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        }/>

        <Route path="/reception/therapies"element={
          <ProtectedRoute role="receptionist">
            <ReceptionTherapyManagement />
          </ProtectedRoute>
        }/>

        <Route path="/forgot-password" element={
          <ForgotPassword />
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
