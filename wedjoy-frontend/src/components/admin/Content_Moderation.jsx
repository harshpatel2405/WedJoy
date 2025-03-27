import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Search, 
  MoreVertical,
  UserX,
  MessageCircleWarning,
  Database,
  Radar,
  Home ,
  ChevronRight, 
} from 'lucide-react';

// Enhanced Mock Data with More Details
const mockReportedContent = [
  {
    id: 1,
    type: 'Comment',
    content: 'Highly inappropriate and offensive language',
    reporter: 'User123',
    reportedUser: 'ViolentCommenter',
    timestamp: '2024-03-06 10:30:45',
    severity: 'high',
    platform: 'Forum',
    category: 'Hate Speech'
  },
  {
    id: 2,
    type: 'Review',
    content: 'Suspicious promotional content detected',
    reporter: 'Moderator456',
    reportedUser: 'SpammerPro',
    timestamp: '2024-03-06 11:15:22',
    severity: 'medium',
    platform: 'Product Reviews',
    category: 'Spam'
  },
  {
    id: 3,
    type: 'Event',
    content: 'Potentially misleading event description',
    reporter: 'System',
    reportedUser: 'EventOrganizer789',
    timestamp: '2024-03-06 09:45:10',
    severity: 'low',
    platform: 'Community Events',
    category: 'Misinformation'
  }
];

const Content_Moderation = () => {
  const [reportedContent, setReportedContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to fetch reported content
    setReportedContent(mockReportedContent);
    setFilteredContent(mockReportedContent);
  }, []);

  // Advanced Filtering and Search
  const applyFilters = (filter, search) => {
    let result = mockReportedContent;

    // Filter by severity/type
    if (filter !== 'All') {
      result = result.filter(item => 
        item.severity.toLowerCase() === filter.toLowerCase() || 
        item.type.toLowerCase() === filter.toLowerCase()
      );
    }

    // Search functionality
    if (search) {
      result = result.filter(item => 
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.reportedUser.toLowerCase().includes(search.toLowerCase())
      );
    }

    setSelectedFilter(filter);
    setFilteredContent(result);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(selectedFilter, term);
  };

  const handleApprove = (id) => {
    console.log(`Approving content with ID: ${id}`);
    setReportedContent(prev => prev.filter(item => item.id !== id));
    setFilteredContent(prev => prev.filter(item => item.id !== id));
  };

  const handleRemove = (id) => {
    console.log(`Removing content with ID: ${id}`);
    setReportedContent(prev => prev.filter(item => item.id !== id));
    setFilteredContent(prev => prev.filter(item => item.id !== id));
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filterOptions = ['All', 'High', 'Medium', 'Low', 'Comment', 'Review', 'Event'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="text-blue-600" size={40} />
            <div className="flex items-center text-gray-600">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          <span className="mr-2 text-sm">Home</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="mr-2 text-sm text-gray-500">Admin</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Content Moderation</span>
        </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search content..." 
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-2">
              {filterOptions.map(filter => (
                <button
                  key={filter}
                  onClick={() => applyFilters(filter, searchTerm)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    selectedFilter === filter 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
          {/* Reported Content Section */}
          <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertOctagon className="text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">Reported Content</h2>
            </div>

            {filteredContent.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Flag className="mx-auto mb-4" size={48} />
                No reported content matches your filters
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow pr-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                            {item.severity.toUpperCase()} {item.type}
                          </span>
                          <span className="text-gray-500 text-sm">Platform: {item.platform}</span>
                        </div>
                        <p className="text-gray-700 line-clamp-2 mb-2">{item.content}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <UserX size={16} />
                          <span>Reported User: {item.reportedUser}</span>
                        </div>
                        <span className="text-xs text-gray-400">{item.timestamp}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(item.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                          title="Approve Content"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                          title="Remove Content"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Moderation Stats and Quick Actions */}
          <div className="space-y-6">
            {/* Moderation Overview */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Radar className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-700">Moderation Overview</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Database size={20} className="text-blue-600" />
                    <span className="text-blue-600 font-medium">Total Reported</span>
                  </div>
                  <span className="font-bold text-blue-800">{filteredContent.length}</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <MessageCircleWarning size={20} className="text-green-600" />
                    <span className="text-green-600 font-medium">Content Categories</span>
                  </div>
                  <span className="font-bold text-green-800">3 Types</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content_Moderation;