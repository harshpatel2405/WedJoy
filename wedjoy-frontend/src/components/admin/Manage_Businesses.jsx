import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ShieldX, 
  Star, 
  DollarSign, 
  BarChart, 
  Search, 
  Users,
  Coins,
  TrendingUp,
  Award,
  Filter,
  ListChecks,
  CircleDollarSign,
  Workflow,
  X,
  Home,
  ChevronRight,
} from 'lucide-react';

// Enhanced Mock Business Data
const mockBusinesses = [
  {
    id: 1,
    name: 'Tech Innovations Inc.',
    owner: 'Sarah Johnson',
    category: 'Technology',
    rating: 4.7,
    status: 'Approved',
    revenue: 157500,
    subscribers: 1200,
    services: ['Software Development', 'Cloud Consulting'],
    joinedDate: '2023-01-15',
    email: 'sarah.johnson@techinnovations.com',
    phone: '+1 (415) 555-1234'
  },
  {
    id: 2,
    name: 'Green Eats Cafe',
    owner: 'Michael Chen',
    category: 'Food & Beverage',
    rating: 4.5,
    status: 'Pending',
    revenue: 85000,
    subscribers: 750,
    services: ['Organic Catering', 'Meal Prep'],
    joinedDate: '2023-06-22',
    email: 'michael.chen@greeneats.com',
    phone: '+1 (650) 555-5678'
  },
  {
    id: 3,
    name: 'Fitness Revolution',
    owner: 'Emily Rodriguez',
    category: 'Fitness',
    rating: 4.9,
    status: 'Approved',
    revenue: 123400,
    subscribers: 950,
    services: ['Personal Training', 'Online Classes'],
    joinedDate: '2023-03-10',
    email: 'emily.rodriguez@fitnessrevolution.com',
    phone: '+1 (310) 555-9012'
  }
];

const Manage_Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    // Simulate API call
    setBusinesses(mockBusinesses);
    setFilteredBusinesses(mockBusinesses);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Rejected': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApprove = (id) => {
    const updatedBusinesses = businesses.map(business => 
      business.id === id ? { ...business, status: 'Approved' } : business
    );
    setBusinesses(updatedBusinesses);
    setFilteredBusinesses(updatedBusinesses);
  };

  const handleReject = (id) => {
    const updatedBusinesses = businesses.map(business => 
      business.id === id ? { ...business, status: 'Rejected' } : business
    );
    setBusinesses(updatedBusinesses);
    setFilteredBusinesses(updatedBusinesses);
  };

  const applyFilters = (filter, search) => {
    let result = mockBusinesses;

    // Filter by status or category
    if (filter !== 'All') {
      result = result.filter(business => 
        business.status === filter || 
        business.category === filter
      );
    }

    // Search functionality
    if (search) {
      result = result.filter(business => 
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.owner.toLowerCase().includes(search.toLowerCase()) ||
        business.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setSelectedFilter(filter);
    setFilteredBusinesses(result);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(selectedFilter, term);
  };

  const calculateTotalRevenue = () => {
    return filteredBusinesses.reduce((sum, business) => sum + business.revenue, 0);
  };

  const filterOptions = [
    'All', 
    'Approved', 
    'Pending', 
    'Rejected', 
    'Technology', 
    'Food & Beverage', 
    'Fitness'
  ];

  const openBusinessDetails = (business) => {
    setSelectedBusiness(business);
  };

  const closeBusinessDetails = () => {
    setSelectedBusiness(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
       <div className="flex items-center text-gray-600">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          <span className="mr-2 text-sm">Home</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="mr-2 text-sm text-gray-500">Admin</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Manage Businesses</span>
        </div>
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search businesses..." 
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {filterOptions.map(filter => (
                <button
                  key={filter}
                  onClick={() => applyFilters(filter, searchTerm)}
                  className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedFilter === filter 
                      ? 'bg-indigo-500 text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border shadow-sm'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business List */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Users className="text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">Business Listings</h2>
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Building2 className="mx-auto mb-4" size={48} />
                No businesses match your filters
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBusinesses.map((business) => (
                  <div 
                    key={business.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow pr-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                              {business.name}
                            </h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(business.status)}`}>
                              {business.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="text-yellow-500" size={16} />
                            <span className="text-gray-600">{business.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <span>Owner: {business.owner}</span>
                          <span>•</span>
                          <span>Category: {business.category}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <DollarSign size={16} className="text-green-500" />
                          <span>Revenue: ${business.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(business.id)}
                          className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors"
                          title="Approve Business"
                        >
                          <ShieldCheck size={20} />
                        </button>
                        <button 
                          onClick={() => handleReject(business.id)}
                          className="p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
                          title="Reject Business"
                        >
                          <ShieldX size={20} />
                        </button>
                        <button 
                          onClick={() => openBusinessDetails(business)}
                          className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
                          title="View Details"
                        >
                          <ListChecks size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Business Stats */}
          <div className="space-y-6">
            {/* Revenue Overview */}
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <BarChart className="text-indigo-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-700">Financial Insights</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center border border-indigo-200">
                  <div className="flex items-center space-x-2">
                    <Coins size={20} className="text-indigo-600" />
                    <span className="text-indigo-600 font-medium">Total Revenue</span>
                  </div>
                  <span className="font-bold text-indigo-800">
                    ${calculateTotalRevenue().toLocaleString()}
                  </span>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg flex justify-between items-center border border-emerald-200">
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={20} className="text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Total Businesses</span>
                  </div>
                  <span className="font-bold text-emerald-800">{filteredBusinesses.length}</span>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg flex justify-between items-center border border-amber-200">
                  <div className="flex items-center space-x-2">
                    <Award size={20} className="text-amber-600" />
                    <span className="text-amber-600 font-medium">Premium Listings</span>
                  </div>
                  <span className="font-bold text-amber-800">
                    {filteredBusinesses.filter(b => b.subscribers > 1000).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details Modal */}
        {selectedBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
              <button 
                onClick={closeBusinessDetails}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center mb-6">
                <Building2 className="text-indigo-600 mr-4" size={40} />
                <h2 className="text-2xl font-bold text-gray-800">{selectedBusiness.name}</h2>
                <span className={`ml-4 px-3 py-1 rounded text-xs font-medium border ${getStatusColor(selectedBusiness.status)}`}>
                  {selectedBusiness.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Business Details</h3>
                  <div className="space-y-2">
                    <p><strong>Owner:</strong> {selectedBusiness.owner}</p>
                    <p><strong>Category:</strong> {selectedBusiness.category}</p>
                    <p><strong>Rating:</strong> {selectedBusiness.rating}</p>
                    <p><strong>Joined:</strong> {selectedBusiness.joinedDate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> {selectedBusiness.email}</p>
                    <p><strong>Phone:</strong> {selectedBusiness.phone}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Services</h3>
                <div className="flex space-x-2">
                  {selectedBusiness.services.map((service) => (
                    <span 
                      key={service}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage_Businesses;