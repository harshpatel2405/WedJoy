import React, { useState } from "react";
import { Megaphone, Plus, BarChart3, Edit, Trash, Clock, CheckCircle, XCircle } from "lucide-react";

const BusinessPromotionsAds = () => {
  // State for promotions
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: "50% Off Summer Sale",
      status: "active",
      endDate: "2025-03-30",
      views: 12000,
      clicks: 800,
      conversions: 150,
    },
    {
      id: 2,
      title: "Free Shipping Weekend",
      status: "active",
      endDate: "2025-04-15",
      views: 8000,
      clicks: 500,
      conversions: 100,
    },
    {
      id: 3,
      title: "Buy One Get One Free",
      status: "inactive",
      endDate: "2025-02-28",
      views: 15000,
      clicks: 1200,
      conversions: 300,
    },
  ]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromotionTitle, setNewPromotionTitle] = useState("");
  const [newPromotionEndDate, setNewPromotionEndDate] = useState("");

  // Function to handle adding a new promotion
  const handleAddPromotion = () => {
    if (newPromotionTitle.trim() === "" || newPromotionEndDate === "") return;
    const newPromotion = {
      id: promotions.length + 1,
      title: newPromotionTitle,
      status: "active",
      endDate: newPromotionEndDate,
      views: 0,
      clicks: 0,
      conversions: 0,
    };
    setPromotions([...promotions, newPromotion]);
    setNewPromotionTitle("");
    setNewPromotionEndDate("");
    setIsModalOpen(false);
  };

  // Function to handle deleting a promotion
  const handleDeletePromotion = (id) => {
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  // Function to handle editing a promotion
  const handleEditPromotion = (id, updatedPromotion) => {
    setPromotions(
      promotions.map((promotion) =>
        promotion.id === id ? { ...promotion, ...updatedPromotion } : promotion
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-gray-500" />
          Promotions & Ads
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Create Promotion
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Promotions Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Total Promotions</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">{promotions.length}</p>
        </div>

        {/* Active Promotions Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold">Active Promotions</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {promotions.filter((promotion) => promotion.status === "active").length}
          </p>
        </div>

        {/* Inactive Promotions Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold">Inactive Promotions</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {promotions.filter((promotion) => promotion.status === "inactive").length}
          </p>
        </div>
      </div>

      {/* Active Promotions Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <h3 className="text-xl font-medium mb-4">Active Promotions</h3>
        <div className="space-y-4">
          {promotions
            .filter((promotion) => promotion.status === "active")
            .map((promotion) => (
              <div
                key={promotion.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{promotion.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEditPromotion(promotion.id, {
                          title: "Updated Promotion Title",
                        })
                      }
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePromotion(promotion.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Running until: {promotion.endDate}
                </p>

                {/* Performance Metrics */}
                <div className="mt-3 flex gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-blue-500" /> Views:{" "}
                    {promotion.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-green-500" /> Clicks:{" "}
                    {promotion.clicks.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-red-500" /> Conversions:{" "}
                    {promotion.conversions.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Inactive Promotions Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <h3 className="text-xl font-medium mb-4">Inactive Promotions</h3>
        <div className="space-y-4">
          {promotions
            .filter((promotion) => promotion.status === "inactive")
            .map((promotion) => (
              <div
                key={promotion.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{promotion.title}</h4>
                  <button
                    onClick={() => handleDeletePromotion(promotion.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Ended on: {promotion.endDate}
                </p>

                {/* Performance Metrics */}
                <div className="mt-3 flex gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-blue-500" /> Views:{" "}
                    {promotion.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-green-500" /> Clicks:{" "}
                    {promotion.clicks.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-red-500" /> Conversions:{" "}
                    {promotion.conversions.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Create Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Promotion</h2>
            <input
              type="text"
              placeholder="Promotion Title"
              value={newPromotionTitle}
              onChange={(e) => setNewPromotionTitle(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="date"
              placeholder="End Date"
              value={newPromotionEndDate}
              onChange={(e) => setNewPromotionEndDate(e.target.value)}
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
                onClick={handleAddPromotion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPromotionsAds;