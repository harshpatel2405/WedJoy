import React, { useState, useEffect } from 'react';
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

const Reports_Analytics = () => {
  // State management
  const [activeTab, setActiveTab] = useState('revenue');
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState({
    revenue: {
      daily: [],
      monthly: [],
      yearly: [],
      totalRevenue: 0
    },
    events: {
      ticketsSold: 0,
      totalEvents: 0,
      engagementData: []
    },
    users: {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      demographics: {}
    },
    insights: {
      topPerformers: [],
      recentTrends: []
    }
  });

  // Mock Data Generation
  useEffect(() => {
    const generateMockData = () => {
      setReportData({
        revenue: {
          daily: [
            { date: 'Mon', amount: 2750, color: 'bg-blue-500' },
            { date: 'Tue', amount: 3250, color: 'bg-green-500' },
            { date: 'Wed', amount: 2900, color: 'bg-purple-500' },
            { date: 'Thu', amount: 3500, color: 'bg-indigo-500' },
            { date: 'Fri', amount: 4100, color: 'bg-pink-500' },
            { date: 'Sat', amount: 3800, color: 'bg-teal-500' },
            { date: 'Sun', amount: 3200, color: 'bg-orange-500' }
          ],
          monthly: [
            { month: 'Jan', amount: 82500, color: 'bg-blue-600' },
            { month: 'Feb', amount: 95000, color: 'bg-green-600' },
            { month: 'Mar', amount: 88750, color: 'bg-purple-600' }
          ],
          yearly: [
            { year: '2023', amount: 1050000, color: 'bg-indigo-600' },
            { year: '2024', amount: 1250000, color: 'bg-pink-600' }
          ],
          totalRevenue: 1250000
        },
        events: {
          ticketsSold: 12453,
          totalEvents: 42,
          engagementData: [
            { name: 'High Engagement', percentage: 65, color: 'bg-green-500' },
            { name: 'Medium Engagement', percentage: 25, color: 'bg-yellow-500' },
            { name: 'Low Engagement', percentage: 10, color: 'bg-red-500' }
          ]
        },
        users: {
          totalUsers: 25640,
          activeUsers: 18920,
          newUsers: 1245,
          demographics: {
            '18-24': 22,
            '25-34': 35,
            '35-44': 28,
            '45+': 15
          }
        },
        insights: {
          topPerformers: [
            { 
              name: 'Tech Innovators', 
              revenue: 325000, 
              growth: 15.5,
              icon: '💻',
              color: 'bg-blue-100'
            },
            { 
              name: 'Creative Solutions', 
              revenue: 275000, 
              growth: 12.3,
              icon: '🎨',
              color: 'bg-purple-100'
            },
            { 
              name: 'Global Events', 
              revenue: 250000, 
              growth: 10.7,
              icon: '🌍',
              color: 'bg-green-100'
            }
          ],
          recentTrends: [
            { 
              title: 'Virtual Event Growth', 
              percentage: '+22%', 
              color: 'text-green-600' 
            },
            { 
              title: 'Corporate Bookings', 
              percentage: '+15%', 
              color: 'text-blue-600' 
            }
          ]
        }
      });

      // Simulate loading
      setTimeout(() => setIsLoading(false), 1000);
    };

    generateMockData();
  }, []);

  // Responsive Stat Card Component
  const StatCard = ({ title, value, subtitle, color, icon }) => (
    <div className={`
      ${color} 
      rounded-xl shadow-md p-4 transform transition-all 
      hover:scale-105 hover:shadow-lg
    `}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
    </div>
  );

  // Loading Spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Tab Content Renderer
  const renderTabContent = () => {
    switch(activeTab) {
      case 'revenue':
        return (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Revenue Overview */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Total Revenue: ${reportData.revenue.totalRevenue.toLocaleString()}
              </h2>
              <div className="flex space-x-2 h-32">
                {reportData.revenue.daily.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col justify-end flex-1"
                    title={`${day.date}: $${day.amount}`}
                  >
                    <div 
                      className={`${day.color} rounded-t-lg`}
                      style={{ height: `${(day.amount / 4100) * 100}%` }}
                    ></div>
                    <span className="text-xs text-center mt-1">{day.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Revenue Stats */}
            <StatCard 
              title="Daily Avg" 
              value={`$${Math.round(reportData.revenue.totalRevenue / 365).toLocaleString()}`}
              color="bg-blue-50"
              icon="💰"
            />
            <StatCard 
              title="Monthly Avg" 
              value={`$${Math.round(reportData.revenue.totalRevenue / 12).toLocaleString()}`}
              color="bg-green-50"
              icon="📊"
            />
            <StatCard 
              title="Yearly Growth" 
              value="+18.5%" 
              color="bg-purple-50"
              icon="📈"
            />
          </div>
        );
      
      case 'events':
        return (
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard 
              title="Total Tickets Sold" 
              value={reportData.events.ticketsSold.toLocaleString()}
              color="bg-blue-50"
              icon="🎟️"
            />
            <StatCard 
              title="Total Events" 
              value={reportData.events.totalEvents}
              color="bg-green-50"
              icon="🎉"
            />
            <StatCard 
              title="Avg Tickets per Event" 
              value={Math.round(reportData.events.ticketsSold / reportData.events.totalEvents)}
              color="bg-purple-50"
              icon="🎫"
            />

            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Event Engagement Levels</h3>
              <div className="space-y-3">
                {reportData.events.engagementData.map((engagement, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                      <div 
                        className={`${engagement.color} h-4 rounded-full`}
                        style={{ width: `${engagement.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {engagement.name}: {engagement.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard 
              title="Total Users" 
              value={reportData.users.totalUsers.toLocaleString()}
              color="bg-blue-50"
              icon="👥"
            />
            <StatCard 
              title="Active Users" 
              value={reportData.users.activeUsers.toLocaleString()}
              color="bg-green-50"
              icon="🟢"
            />
            <StatCard 
              title="New Users" 
              value={reportData.users.newUsers.toLocaleString()}
              color="bg-purple-50"
              icon="✨"
            />

            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">User Demographics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(reportData.users.demographics).map(([age, percentage]) => (
                  <div 
                    key={age} 
                    className="bg-gray-100 rounded-lg p-3 text-center"
                  >
                    <p className="text-sm font-medium text-gray-600">{age} years</p>
                    <p className="text-lg font-bold text-blue-600">{percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Top Performing Vendors</h3>
              <div className="space-y-3">
                {reportData.insights.topPerformers.map((performer, index) => (
                  <div 
                    key={index} 
                    className={`
                      ${performer.color} 
                      rounded-lg p-4 flex justify-between items-center
                      hover:shadow-md transition-all
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{performer.icon}</span>
                      <div>
                        <p className="font-bold">{performer.name}</p>
                        <p className="text-sm text-gray-600">
                          ${performer.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">
                      +{performer.growth}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recent Trends</h3>
              <div className="space-y-3">
                {reportData.insights.recentTrends.map((trend, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 rounded-lg p-3 flex justify-between items-center"
                  >
                    <p className="text-sm font-medium">{trend.title}</p>
                    <span className={`font-bold ${trend.color}`}>
                      {trend.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Reports & Analytics
        </h1> */}
 <div className="flex items-center text-gray-600">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          <span className="mr-2 text-sm">Home</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="mr-2 text-sm text-gray-500">Admin</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Reorts & Analytics</span>
        </div>
       
        <div className="flex flex-wrap justify-center space-x-2 mb-6">
          {[
            { key: 'revenue', label: 'Revenue', icon: '💸' },
            { key: 'events', label: 'Events', icon: '🎫' },
            { key: 'users', label: 'Users', icon: '👥' },
            { key: 'insights', label: 'Insights', icon: '🔍' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-4 py-2 rounded-full transition-all 
                flex items-center space-x-2
                ${activeTab === tab.key 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'}
              `}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

       
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Reports_Analytics;
