import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-pink-500 text-white rounded-md shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isSidebarOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 bg-white shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
        style={{ width: "250px" }}
      >
        <Card className="h-full w-full p-4">
          <Typography variant="h5" color="blue-gray">
            Dashboard
          </Typography>
          <div className="mb-4 p-2 flex items-center">
            <img
              src="https://i.pinimg.com/564x/5a/83/19/5a8319142257cb937fbd91a16422e369.jpg"
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover mr-2"
            />
            <div>
              <span className="text-lg font-semibold">Tasneem Abuarqob</span>
            </div>
          </div>
          <List>
            <ListItem className="hover:bg-red-200">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <Link
                to="/MainDashboard"
                className="text-black hover:text-red-500"
              >
                Dashboard
              </Link>
            </ListItem>
            <ListItem className="hover:bg-red-200">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <Link to="/AddTicket" className="text-black hover:text-red-500">
                Add new Ticket
              </Link>
            </ListItem>
            <ListItem className="hover:bg-red-200">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <Link
                to="/AllTicketDash"
                className="text-black hover:text-red-500"
              >
                Tickets
              </Link>
            </ListItem>
            <ListItem className="hover:bg-red-200">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <Link to="/Profile" className="text-black hover:text-red-500">
                User Profile
              </Link>
            </ListItem>
            <ListItem className="hover:bg-red-200">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <Link
                to="/MessageAdmin"
                className="text-black hover:text-red-500"
              >
                Inbox
              </Link>
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full text-red-500 border-red-500"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              className="hover:bg-red-200 cursor-pointer"
              onClick={handleLogout}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-red-500" />
              </ListItemPrefix>
              <span className="text-black hover:text-red-500">Log Out</span>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}

export default SideBar;
