import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthLayout from "@/components/layout/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import Home from "@/pages/public/Home";
import Projects from "@/pages/public/Projects";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Pricing from "@/pages/public/Pricing";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";

import Dashboard from "@/pages/dashboard/Dashboard";
import MyProjects from "@/pages/dashboard/MyProjects";
import MySubmissions from "@/pages/dashboard/MySubmissions";
import Certificates from "@/pages/dashboard/Certificates";
import Profile from "@/pages/dashboard/Profile";

import CompanyDashboard from "@/pages/company/CompanyDashboard";
import CompanyProjects from "@/pages/company/CompanyProjects";
import AddProject from "@/pages/company/AddProject";
import CompanyProfile from "@/pages/company/CompanyProfile";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageProjects from "@/pages/admin/ManageProjects";
import ManageUsers from "@/pages/admin/ManageUsers";
import ReviewSubmissions from "@/pages/admin/ReviewSubmissions";
import CertificatesApproval from "@/pages/admin/CertificatesApproval";
import RatingsManager from "@/pages/admin/RatingsManager";

const RoleRedirect = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <Navigate to="/admin" replace />;
  if (user?.role === "company") return <Navigate to="/company" replace />;
  return <Navigate to="/student-dashboard" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </Route>

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <RoleRedirect />
        </ProtectedRoute>
      }
    />

    <Route
      path="/student-dashboard"
      element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={["student", "graduate"]}>
            <DashboardLayout role="student" />
          </RoleBasedRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<MyProjects />} />
      <Route path="submissions" element={<MySubmissions />} />
      <Route path="certificates" element={<Certificates />} />
      <Route path="profile" element={<Profile />} />
    </Route>

    <Route
      path="/company"
      element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={["company"]}>
            <DashboardLayout role="company" />
          </RoleBasedRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<CompanyDashboard />} />
      <Route path="projects" element={<CompanyProjects />} />
      <Route path="projects/add" element={<AddProject />} />
      <Route path="profile" element={<CompanyProfile />} />
    </Route>

    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <RoleBasedRoute allowedRoles={["admin"]}>
            <DashboardLayout role="admin" />
          </RoleBasedRoute>
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminDashboard />} />
      <Route path="projects" element={<ManageProjects />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="submissions" element={<ReviewSubmissions />} />
      <Route path="certificates" element={<CertificatesApproval />} />
      <Route path="ratings" element={<RatingsManager />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
