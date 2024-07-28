import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Profile() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://airline-tickets-46241-default-rtdb.firebaseio.com/Users.json"
        );
        if (response.data) {
          const fetchedUsers = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
            coupon: response.data[key].coupon || {},
            status: response.data[key].status || "active",
          }));
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditCoupon = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveCoupon = async () => {
    try {
      const updatedCoupon = { code: newCouponCode, discount: newDiscount };
      await axios.patch(
        `https://airline-tickets-46241-default-rtdb.firebaseio.com/Users/${editingUserId}/coupon.json`,
        updatedCoupon
      );
      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...user, coupon: updatedCoupon } : user
        )
      );
      setEditingUserId(null);
      setNewCouponCode("");
      setNewDiscount("");
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  const handleDeactivateAccount = async (userId) => {
    try {
      await axios.patch(
        `https://airline-tickets-46241-default-rtdb.firebaseio.com/Users/${userId}.json`,
        { status: "deactivated" }
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "deactivated" } : user
        )
      );
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };

  const activeUsers = users.filter((user) => user.status === "active").length;
  const deactivatedUsers = users.filter(
    (user) => user.status === "deactivated"
  ).length;

  const data = {
    labels: ["Active Users", "Deactivated Users"],
    datasets: [
      {
        label: "# of Users",
        data: [activeUsers, deactivatedUsers],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-4 sm:mx-8 lg:mx-12 w-auto mt-10 flex flex-col justify-center lg:flex-row gap-6">
      <div className="w-full lg:w-1/2">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Number of Active users on Air Travel website: ({users.length})
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Manage and view details of users, including their names, positions,
            and online status. Easily edit user profiles as needed.
          </p>
          <p className="text-lg font-semibold text-gray-500 mb-4">
            Activate user accounts to enable access and functionality:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border border-gray-200 bg-white rounded-lg shadow-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        Select all
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Coupon Code
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`bg-white border-b hover:bg-gray-50 ${
                      user.status === "deactivated" ? "opacity-50" : ""
                    }`}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${user.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${user.id}`}
                          className="sr-only"
                        >
                          Select
                        </label>
                      </div>
                    </td>
                    <td className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.photo}
                        alt="User"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {user.firstName}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg w-full"
                          placeholder="Enter coupon code"
                        />
                      ) : (
                        user.coupon.code || "No coupon"
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={newDiscount}
                          onChange={(e) => setNewDiscount(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg w-full"
                          placeholder="Enter discount"
                        />
                      ) : (
                        user.coupon.discount || "No discount"
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            user.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } me-2`}
                        ></div>
                        {user.status === "active" ? "Online" : "Deactivated"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {editingUserId === user.id ? (
                        <button
                          onClick={handleSaveCoupon}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditCoupon(user.id)}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeactivateAccount(user.id)}
                            className="font-medium text-red-600 hover:underline ml-2"
                          >
                            Deactivate
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-pink-600 text-white rounded"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-pink-600 text-white rounded"
            >
              Next
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-4 h-full mt-12">
              <p className="text-lg font-semibold text-gray-700 mb-4">
                User Statistics
              </p>
              <div className="h-72">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
