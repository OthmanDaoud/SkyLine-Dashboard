import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

function MainDashboard() {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);

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

    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          "https://airline-tickets-46241-default-rtdb.firebaseio.com/trips/Trips.json"
        );
        if (response.data) {
          const fetchedTrips = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          setTrips(fetchedTrips);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchUsers();
    fetchTrips();
  }, []);

  const couponData = users.reduce((acc, user) => {
    const couponCode = user.coupon.code || "No Coupon";
    acc[couponCode] = (acc[couponCode] || 0) + 1;
    return acc;
  }, {});

  const couponLabels = Object.keys(couponData);
  const couponCounts = Object.values(couponData);

  const statusData = users.reduce((acc, user) => {
    const status = user.status || "active";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusLabels = Object.keys(statusData);
  const statusCounts = Object.values(statusData);

  const couponChartData = {
    labels: couponLabels,
    datasets: [
      {
        label: "# of Users with Coupon",
        data: couponCounts,
        backgroundColor: "rgba(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.9)",
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: "# of Users by Status",
        data: statusCounts,
        backgroundColor: ["rgba(54, 162, 235)", "rgba(255, 99, 132)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const destinationData = trips.reduce((acc, trip) => {
    const destination = trip.destination || "No Destination";
    acc[destination] = (acc[destination] || 0) + 1;
    return acc;
  }, {});

  const destinationLabels = Object.keys(destinationData);
  const destinationCounts = Object.values(destinationData);

  const destinationChartData = {
    labels: destinationLabels,
    datasets: [
      {
        label: "# of Trips by Destination",
        data: destinationCounts,
        backgroundColor: "rgba(255, 99, 132)", // Red color for destinations
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="block p-5">
        <div className="p-5 bg-white flex gap-4">
          <div className="w-full sm:w-1/2 lg:w-1/3 p-3 bg-white">
            <h2 className="text-xl font-bold mb-2">Coupon Usage</h2>
            <div className="chart-wrapper">
              <Bar
                data={couponChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                height={200}
              />
            </div>
            <p className="text-center mt-2">
              This bar chart shows the distribution of users based on coupon
              usage.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 p-3 bg-white">
            <h2 className="text-xl font-bold mb-2">User Status</h2>
            <div className="chart-wrapper">
              <Pie
                data={statusChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                height={200}
              />
            </div>
            <p className="text-center mt-2">
              This pie chart displays the distribution of users by status.
            </p>
          </div>
        </div>

        <div className=" sm:w-1/2 lg:w-1/3 p-3 bg-white">
          <h2 className="text-xl font-bold mb-2">Trip Destinations</h2>
          <div className="chart-wrapper">
            <Line
              data={destinationChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>
          <p className="text-center mt-2">
            This line chart shows the number of trips by destination.
          </p>
        </div>
      </div>
    </>
  );
}

export default MainDashboard;
