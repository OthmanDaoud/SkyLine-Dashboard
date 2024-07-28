import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SideBar from "./SideBar";
import Login from "./sign in/Signin";
import MainDashboard from "./MainpageDashoard/MainDashboard";
import AddTicket from "./formDashboard/AddTicket";
import MessageAdmin from "./messageforadmin/MessageAdmin";
import AllTicketDash from "./alltickets/AllTicketsDash";
import Profile from "./profiledash/ProfileDash";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const containerClasses = isLoginPage ? "bg-gray-100" : "flex bg-gray-100";

  return (
    <div className={containerClasses}>
      {!isLoginPage && <SideBar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainDashboard" element={<MainDashboard />} />
        <Route path="/AddTicket" element={<AddTicket />} />
        <Route path="/MessageAdmin" element={<MessageAdmin />} />
        <Route path="/AllTicketDash" element={<AllTicketDash />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
