import React, { useState } from 'react';

const BusinessDashboardOverview = () => {
  // State to manage the active filter and time period
  const [activeFilter, setActiveFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState('monthly');

  // More comprehensive sample data
  const data = {
    sales: { 
      total: 50000, 
      monthly: 10000, 
      quarterly: 30000, 
      yearly: 180000 
    },
    customers: { 
      total: 1200, 
      monthly: 150, 
      quarterly: 450, 
      yearly: 1000,
      retention: 87 
    },
    orders: { 
      total: 500, 
      pending: 25, 
      processing: 15, 
      completed: 460, 
      cancelled: 8 
    },
    revenue: { 
      total: 75000, 
      monthly: 8500, 
      quarterly: 25000, 
      yearly: 95000 
    },
    growth: { 
      monthly: 12, 
      quarterly: 8, 
      yearly: 15, 
      projected: 18 
    },
    engagement: { 
      activeUsers: 850, 
      rate: 78, 
      avgSessionTime: 5.2, 
      bounceRate: 22 
    },
  };

  // Filter options
  const filters = [
    { id: 'all', label: 'All', icon: '📊' },
    { id: 'sales', label: 'Sales', icon: '💰' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'revenue', label: 'Revenue', icon: '💵' },
    { id: 'growth', label: 'Growth', icon: '📈' },
    { id: 'engagement', label: 'Engagement', icon: '🔍' },
  ];

  // Time period options
  const timePeriods = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  // Function to handle filter selection
  const handleFilter = (filterId) => {
    setActiveFilter(filterId);
  };

  // Function to handle time period selection
  const handleTimePeriod = (periodId) => {
    setTimePeriod(periodId);
  };

  // Function to filter cards based on the active filter
  const filteredCards = () => {
    if (activeFilter === 'all') {
      return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
    }
    return [{ id: activeFilter, ...data[activeFilter] }];
  };

  // Function to format values appropriately
  const formatValue = (key, value) => {
    if (typeof value !== 'number') return value;
    
    if (key.includes('Rate') || key === 'rate' || key === 'retention' || key === 'projected') {
      return `${value}%`;
    } else if (key === 'avgSessionTime') {
      return `${value} min`;
    } else if (key === 'bounceRate') {
      return `${value}%`;
    } else if (key === 'activeUsers') {
      return value.toLocaleString();
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  // Function to determine if a card should display based on the time period
  const shouldDisplayCard = (card) => {
    if (activeFilter === 'all') return true;
    return card.hasOwnProperty(timePeriod) || card.id === 'orders' || card.id === 'engagement';
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Business Dashboard Overview
        </h1>
        <p className="text-gray-600 text-center">
          Data updated as of {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilter(filter.id)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Time Period Filter */}
        {activeFilter !== 'orders' && activeFilter !== 'engagement' && (
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {timePeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => handleTimePeriod(period.id)}
                  className={`px-4 py-1 rounded-lg transition-all duration-200 ${
                    timePeriod === period.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards()
          .filter(shouldDisplayCard)
          .map((card) => (
            <div
              key={card.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 capitalize flex items-center gap-2">
                  <span className="text-2xl">
                    {filters.find(f => f.id === card.id)?.icon}
                  </span>
                  {card.id}
                </h2>
                {card[timePeriod] && card.id !== 'orders' && card.id !== 'engagement' && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {timePeriod}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {Object.entries(card).map(([key, value]) => {
                  if (key === 'id') return null; // Skip the 'id' field
                  
                  // Skip keys that don't match the current time period
                  if (activeFilter !== 'all' && 
                      key !== timePeriod && 
                      !['total', 'pending', 'processing', 'completed', 'cancelled', 'activeUsers', 'rate', 'retention', 'projected', 'avgSessionTime', 'bounceRate'].includes(key)) {
                    return null;
                  }
                  
                  // Format the key for display
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  // Determine text color based on key
                  let textColorClass = 'text-indigo-600';
                  if (key.includes('total') || key === 'completed' || key === 'activeUsers') {
                    textColorClass = 'text-green-600';
                  } else if (key.includes('pending') || key === 'cancelled' || key === 'bounceRate') {
                    textColorClass = 'text-red-600';
                  } else if (key === 'processing') {
                    textColorClass = 'text-yellow-600';
                  }
                  
                  return (
                    <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600">{formattedKey}:</span>
                      <span className={`font-bold ${textColorClass}`}>
                        {formatValue(key, value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BusinessDashboardOverview;