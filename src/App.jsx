import { Outlet } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ReminderPage from "./pages/Reminder";
import WorkoutPage from "./pages/Workout";
import MealPlanning from "./pages/MealPlanning";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import WorkoutDetailPage from "./components/workout";
import ProtectedRoute from "./components/ProtectedRoute";

// New component for authenticated layout
const AuthenticatedLayout = () => {
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Outlet /> {/* This renders the child routes */}
      </AnimatePresence>
      <Navbar />
    </>
  );
};

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Routes without auth check */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* All protected routes wrapped in AuthenticatedLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reminder" element={<ReminderPage />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/meal-planning" element={<MealPlanning />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/workout/:id" element={<WorkoutDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;