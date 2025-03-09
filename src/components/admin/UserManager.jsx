import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/admin/Table";
import { Plus } from "lucide-react";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
    status: "Active",
  });

  const API_BASE_URL = "http://localhost:8080/mega_city_cab_war/"; // Replace with your backend URL

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Assuming you store the JWT token in localStorage
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getAllUsers = async () => {
    console.log("Fetching users...");
    try {
      const response = await axios.get(`${API_BASE_URL}/user?action=all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseData = response.data;

      if (responseData.code === 200) {
        console.log("Users Data:", responseData.data);
        setUsers(responseData.data);
      } else {
        console.error("Error fetching users:", responseData.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "Customer",
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [name]: value,
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      });
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}user`,
        {
          userId: selectedUser.userId,
          ...selectedUser,
        },
        getAuthHeaders()
      );

      if (response.data.code === 200) {
        console.log("User updated successfully:", response.data);
        getAllUsers();
        handleCloseModal();
      } else {
        console.error("Error updating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/user?userId=${selectedUser.userId}`, getAuthHeaders());
      getAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/user`, newUser, getAuthHeaders());
      getAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Manager</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddUser}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>
      <Table columns={columns} data={users} onRowClick={handleRowClick} />

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add New User</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
              <select
                name="role"
                className="w-full p-3 border rounded-lg"
                value={newUser.role}
                onChange={handleInputChange}
                required
              >
                <option value="Customer">Customer</option>
                <option value="Driver">Driver</option>
                <option value="Admin">Admin</option>
              </select>
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={newUser.status}
                onChange={handleInputChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add User
              </button>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <form className="space-y-4" onSubmit={handleUpdateUser}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
                value={selectedUser.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
                value={selectedUser.email}
                onChange={handleInputChange}
                required
              />
              <select
                name="role"
                className="w-full p-3 border rounded-lg"
                value={selectedUser.role}
                onChange={handleInputChange}
                required
              >
                <option value="Customer">Customer</option>
                <option value="Driver">Driver</option>
                <option value="Admin">Admin</option>
              </select>
              <select
                name="status"
                className="w-full p-3 border rounded-lg"
                value={selectedUser.status}
                onChange={handleInputChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Update User
                </button>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </button>
              </div>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;