import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

import ReportLostItem from "./pages/ReportLostItem";
import ReportFoundItem from "./pages/ReportFoundItem";

import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";

import MyReports from "./pages/MyReports";

import Notifications from "./pages/Notifications";
import ClaimRequests from "./pages/ClaimRequests";

import useSyncUser from "./hooks/useSyncUser";

function AuthenticatedApp() {
  useSyncUser();

  return (
    <Routes>

      {/* Dashboard */}
      <Route
        path="/"
        element={<Dashboard />}
      />

      {/* Reports */}
      <Route
        path="/report-lost"
        element={<ReportLostItem />}
      />

      <Route
        path="/report-found"
        element={<ReportFoundItem />}
      />

      {/* Feeds */}
      <Route
        path="/lost-items"
        element={<LostItems />}
      />

      <Route
        path="/found-items"
        element={<FoundItems />}
      />

      {/* User Reports */}
      <Route
        path="/my-reports"
        element={<MyReports />}
      />

      {/* Notifications */}
      <Route
        path="/notifications"
        element={<Notifications />}
      />

      {/* Claim Requests */}
      <Route
        path="/claim-requests"
        element={<ClaimRequests />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>

      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <AuthenticatedApp />
      </SignedIn>

    </BrowserRouter>
  );
}

export default App;