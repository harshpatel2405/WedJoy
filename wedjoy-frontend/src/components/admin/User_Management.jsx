import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Lock,
  Unlock,
  BarChart2,
  Filter,
  Search,
  Home,
  ChevronRight,
} from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    registrationDate: "2024-01-15",
    role: "Business Owner",
    status: "Active",
    loginCount: 45,
    lastLogin: "2025-03-01T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    registrationDate: "2024-02-20",
    role: "Event Organizer",
    status: "Banned",
    loginCount: 12,
    lastLogin: "2025-02-15T14:45:00Z",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    registrationDate: "2024-03-10",
    role: "Community Member",
    status: "Pending",
    loginCount: 5,
    lastLogin: "2025-01-22T09:15:00Z",
  },
];

// Mock API Functions
const fetchUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockUsers;
};

const banUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    user.status = "Banned";
    return user;
  }
};

const unbanUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    user.status = "Active";
    return user;
  }
};

const updateUserRole = async (userId, newRole) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = mockUsers.find((u) => u.id === userId);
  if (user) {
    user.role = newRole;
    return user;
  }
};

const User_Management = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Roles for dropdown
  const roles = [
    "Admin",
    "Event Organizer",
    "Business Owner",
    "Community Member",
  ];

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  // Filter and search users
  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "All" || user.role === filter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };

  const handleBanUser = async (userId) => {
    try {
      const updatedUser = await banUser(userId);
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error("Failed to ban user:", error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const updatedUser = await unbanUser(userId);
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error("Failed to unban user:", error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const renderStatusBadge = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Banned: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
           
            <div className="flex items-center text-gray-600">
              <Home className="w-5 h-5 mr-2 text-blue-500" />
              <span className="mr-2 text-sm">Home</span>
              <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
              <span className="mr-2 text-sm text-gray-500">Admin</span>
              <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
             
              <div className="flex items-center text-gray-600"> </div>
              <span className="text-sm font-semibold text-gray-800">
                User Management
              </span>
            </div>
          </h1>

          <div className="flex space-x-2">
            {/* Role Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded flex items-center"
            >
              <option value="All">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded pl-10 w-64"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Registration Date</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.registrationDate}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    {renderStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      {/* View Details */}
                      <button
                        onClick={() => handleViewUserDetails(user)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                        title="View User Details"
                      >
                        <UserCheck size={18} />
                      </button>

                      {/* Role Change Dropdown */}
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleChangeRole(user.id, e.target.value)
                        }
                        className="px-2 py-1 border rounded text-sm"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>

                      {/* Ban/Unban Toggle */}
                      {user.status !== "Banned" ? (
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                          title="Ban User"
                        >
                          <Lock size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          className="text-green-500 hover:bg-green-50 p-2 rounded"
                          title="Unban User"
                        >
                          <Unlock size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details Modal */}
        {isUserDetailsModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="mr-2" /> User Details
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Registration Date:</strong>{" "}
                  {selectedUser.registrationDate}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
                <div className="bg-gray-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <BarChart2 className="mr-2" /> User Engagement
                  </h3>
                  <p>
                    <strong>Login Count:</strong> {selectedUser.loginCount}
                  </p>
                  <p>
                    <strong>Last Login:</strong>{" "}
                    {new Date(selectedUser.lastLogin).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsUserDetailsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User_Management;
