import React, { useState } from "react";
import { Store, Edit, Plus, Trash, CheckCircle, XCircle, List, Settings } from "lucide-react";

const BusinessManageBusiness = () => {
  // State for business details
  const [business, setBusiness] = useState({
    name: "XYZ Store",
    category: "Retail",
    location: "New York, USA",
    contact: "xyz@example.com",
    verified: true,
  });

  // State for listings
  const [listings, setListings] = useState([
    { id: 1, name: "Product A", status: "active" },
    { id: 2, name: "Product B", status: "pending" },
    { id: 3, name: "Service X", status: "active" },
    { id: 4, name: "Product C", status: "inactive" },
  ]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListingName, setNewListingName] = useState("");

  // Function to handle adding a new listing
  const handleAddListing = () => {
    if (newListingName.trim() === "") return;
    const newListing = {
      id: listings.length + 1,
      name: newListingName,
      status: "pending",
    };
    setListings([...listings, newListing]);
    setNewListingName("");
    setIsModalOpen(false);
  };

  // Function to handle deleting a listing
  const handleDeleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  // Function to handle editing business details
  const handleEditBusiness = (field, value) => {
    setBusiness({ ...business, [field]: value });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Business Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Store className="w-6 h-6 text-gray-500" />
            My Business
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
        <div className="mt-4 text-gray-700 space-y-2">
          <p>
            <span className="font-medium">Business Name:</span> {business.name}
          </p>
          <p>
            <span className="font-medium">Category:</span> {business.category}
          </p>
          <p>
            <span className="font-medium">Location:</span> {business.location}
          </p>
          <p>
            <span className="font-medium">Contact:</span> {business.contact}
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              business.verified
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {business.verified ? "✅ Verified Business" : "❌ Unverified Business"}
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Listings Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <List className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Total Listings</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">{listings.length}</p>
        </div>

        {/* Active Listings Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold">Active Listings</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {listings.filter((listing) => listing.status === "active").length}
          </p>
        </div>

        {/* Pending Listings Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold">Pending Listings</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {listings.filter((listing) => listing.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Manage Listings */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Products & Services</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Listing
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">{listing.name}</p>
                <span
                  className={`text-sm ${
                    listing.status === "active"
                      ? "text-green-600"
                      : listing.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {listing.status}
                </span>
              </div>
              <button
                onClick={() => handleDeleteListing(listing.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Listing</h2>
            <input
              type="text"
              placeholder="Listing Name"
              value={newListingName}
              onChange={(e) => setNewListingName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddListing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessManageBusiness;