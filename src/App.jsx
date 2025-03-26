import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ReminderPage from "./pages/Reminder";
import WorkoutPage from "./pages/Workout";
import MealPlanning from "./pages/MealPlanning";
import Navbar from "./components/Navbar";
import Header from "./pages/Header";
import WorkoutDetailPage from "./components/workout";

function Layout() {
  const location = useLocation();
  const noNavbarRoutes = ["/d", "/login", "/signup"];

  return (
    <>
      {/* Show Header unless on restricted pages */}
      {!noNavbarRoutes.includes(location.pathname) && <Header />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<Onboarding />} /> */}
          {/* <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/reminder" element={<ReminderPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workout/:id" element={<WorkoutDetailPage />} />
        </Routes>
      </AnimatePresence>

      {/* Show Navbar unless on restricted pages */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
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
