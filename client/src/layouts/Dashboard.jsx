// src/layouts/Dashboard.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Dashboard</h2>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="my-orders"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`
            }
          >
            My Orders
          </NavLink>
          <NavLink
            to="address"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
              }`
            }
          >
            Saved Address
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* This renders child routes (Profile/MyOrders/Address) */}
      </main>
    </div>
  );
}
