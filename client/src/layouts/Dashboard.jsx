import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  console.log(user);
  // Assuming you store logged-in user in Redux

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Dashboard</h2>

        <nav className="flex flex-col space-y-2">
          {/* Common Links */}

          {/* Admin-Only Links */}
          {user?.role === "ADMIN" && (
            <>
              <hr className="" />
              {/* <h3 className="text-gray-600 font-semibold">Admin Panel</h3> */}
              <NavLink
                to="categories"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="sub-categories"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                Sub Categories
              </NavLink>
              <NavLink
                to="upload-product"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                Upload Product
              </NavLink>
              <NavLink
                to="admin-products"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                Admin Products
              </NavLink>
            </>
          )}
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
        <Outlet /> {/* Render child routes */}
      </main>
    </div>
  );
}
