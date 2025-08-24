 import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, DeleteUserById, UpdateUser } from "../ApiServices/Api";

export default function Employee() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewId, setViewId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [showUpdated, setShowUpdated] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("Please login first!");
          setLoading(false);
          return;
        }
        let data = await GetAllUsers(token);
        data = data.filter((u) => u.role !== "admin"); // exclude admin
        setUsers(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setViewId(user._id);
  };
  const handleCloseView = () => {
    setViewId(null);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = sessionStorage.getItem("token");
      await DeleteUserById(id, token);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to delete user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Open update modal and pre-fill form
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "", // optional
      role: user.role,
    });
    setShowUpdated(true);
  };

  // Submit update form
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const updatedData = { ...form };
      if (!updatedData.password) delete updatedData.password; // only update password if entered

      await UpdateUser(selectedUser._id, updatedData, token);

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u._id === selectedUser._id ? { ...u, ...updatedData } : u))
      );

      alert("User updated successfully!");
      setShowUpdated(false);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Failed to update user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Filters & Add button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search here..."
            className="w-full sm:w-64 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="w-full sm:w-40 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button
          className="w-full md:w-auto bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/adduser")}
        >
          Add New Employee
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Users table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        user.profileStatus === "active"
                          ? "text-green-800 bg-green-100"
                          : "text-yellow-800 bg-yellow-100"
                      }`}
                    >
                      {user.profileStatus || "InActive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 relative inline-block">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setOpenActionId(openActionId === user._id ? null : user._id)
                      }
                      className="cursor-pointer"
                    />
                    {openActionId === user._id && (
                      <div className="absolute top-0 right-10 w-auto bg-[#f3f4f1] rounded-lg shadow-lg z-10 p-4">
                        <RxCross2
                          className="absolute top-1 right-1 cursor-pointer"
                          onClick={() => setOpenActionId(null)}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateClick(user)}
                            className="px-3 py-2 bg-green-600 text-white rounded-full"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="px-3 py-2 bg-red-600 text-white rounded-full"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleView(user)}
                            className="px-3 py-2 bg-blue-600 text-white rounded-full"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewId && selectedUser && (
         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fadeIn">
    
    {/* Close Button */}
    <button
      onClick={handleCloseView}
      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
    >
      ×
    </button>

    {/* Title */}
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
      {selectedUser.name}'s Details
    </h2>

    {/* Details */}
    <div className="space-y-3 text-gray-600">
      <p>
        <span className="font-medium text-gray-800">📧 Email:</span> {selectedUser.email}
      </p>
      <p>
        <span className="font-medium text-gray-800">👤 Role:</span> {selectedUser.role}
      </p>
      <p>
        <span className="font-medium text-gray-800">📌 Status:</span>{" "}
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            selectedUser.profileStatus === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {selectedUser.profileStatus || "Inactive"}
        </span>
      </p>
    </div>
  </div>
</div>

      )}

      {/* Update Modal */}
      {showUpdated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowUpdated(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Password (optional)"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdated(false)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
              {message && <p className="text-red-600 mt-2">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
