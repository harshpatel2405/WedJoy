import React, { useState, useEffect } from 'react';
import { Activity, Users, Calendar, ArrowUp, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Utility function for formatting time
const formatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  if (diffInHours < 1) return 'Just now';
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInHours < 48) return 'Yesterday';
  return `${Math.floor(diffInHours / 24)} days ago`;
};

// StatCard Component
const StatCard = ({ title, value, icon: Icon, color, growthRate, growthLabel }) => (
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</div>
        <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
      </div>
      <div className={`p-3 rounded-full ${color.bg}`}>
        <Icon className={`h-6 w-6 ${color.text}`} />
      </div>
    </div>
    <div className="flex items-center mt-4 text-sm">
      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
      <span className="text-green-500 font-medium">{growthRate}%</span>
      <span className="text-gray-500 ml-2">{growthLabel}</span>
    </div>
  </div>
);

// ActivityItem Component
const ActivityItem = ({ activity }) => {
  const iconProps = {
    new_rsvp: { icon: Users, color: 'text-blue-500' },
    new_participant: { icon: Users, color: 'text-green-500' },
    event_update: { icon: Activity, color: 'text-amber-500' },
    default: { icon: Calendar, color: 'text-gray-500' },
  };

  const { icon: Icon, color } = iconProps[activity.type] || iconProps.default;

  const renderMessage = () => {
    switch (activity.type) {
      case 'new_rsvp':
        return `${activity.count} new RSVPs for "${activity.eventName}"`;
      case 'new_participant':
        return `${activity.count} new participants joined "${activity.eventName}"`;
      case 'event_update':
        return `"${activity.eventName}" was updated: ${activity.message}`;
      default:
        return `Activity on "${activity.eventName}"`;
    }
  };

  return (
    <div className="px-6 py-4 flex items-start hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 mr-4">
        <Icon size={16} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{renderMessage()}</p>
        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
      </div>
    </div>
  );
};

// RecentActivitySection Component
const RecentActivitySection = ({ activities }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-6 py-4 border-b">
      <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
    </div>
    <div className="divide-y divide-gray-200">
      {activities.length > 0 ? (
        activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))
      ) : (
        <div className="px-6 py-4 text-center text-gray-500">
          No recent activity found
        </div>
      )}
    </div>
    <div className="px-6 py-3 bg-gray-50 text-right">
      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
        View all activity →
      </button>
    </div>
  </div>
);

// GrowthChart Component
const GrowthChart = ({ data }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Trends</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="rsvps" stroke="#8b5cf6" strokeWidth={2} />
        <Line type="monotone" dataKey="participants" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Main Component
const EventDashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API calls
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock stats data
      setStats({
        totalEvents: 24,
        totalRSVPs: 1876,
        totalParticipants: 1432,
        upcomingEvents: 5,
        completionRate: 85,
        growthRate: {
          events: 8.5,
          rsvps: 12.3,
          participants: 9.7,
        },
      });

      // Mock recent activity data
      setRecentActivity([
        { id: 1, eventName: "Tech Conference 2025", type: "new_rsvp", count: 12, timestamp: "2025-03-07T15:30:00Z" },
        { id: 2, eventName: "Charity Fundraiser", type: "new_participant", count: 8, timestamp: "2025-03-07T09:45:00Z" },
        { id: 3, eventName: "Workshop Series", type: "event_update", message: "Location changed", timestamp: "2025-03-06T18:20:00Z" },
        { id: 4, eventName: "Networking Mixer", type: "new_rsvp", count: 23, timestamp: "2025-03-05T12:15:00Z" },
      ]);

      // Mock growth data for chart
      setGrowthData([
        { name: 'Jan', events: 10, rsvps: 200, participants: 150 },
        { name: 'Feb', events: 15, rsvps: 400, participants: 300 },
        { name: 'Mar', events: 20, rsvps: 600, participants: 500 },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Event Organizer Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your events.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          icon={Calendar}
          color={{ bg: 'bg-blue-50', text: 'text-blue-500' }}
          growthRate={stats.growthRate.events}
          growthLabel="from last month"
        />
        <StatCard
          title="Total RSVPs"
          value={stats.totalRSVPs.toLocaleString()}
          icon={Users}
          color={{ bg: 'bg-purple-50', text: 'text-purple-500' }}
          growthRate={stats.growthRate.rsvps}
          growthLabel="from last month"
        />
        <StatCard
          title="Total Participants"
          value={stats.totalParticipants.toLocaleString()}
          icon={TrendingUp}
          color={{ bg: 'bg-green-50', text: 'text-green-500' }}
          growthRate={stats.growthRate.participants}
          growthLabel="from last month"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={Clock}
          color={{ bg: 'bg-amber-50', text: 'text-amber-500' }}
          growthRate={0}
          growthLabel="scheduled"
        />
      </div>

      {/* Growth Chart */}
      <div className="mb-8">
        <GrowthChart data={growthData} />
      </div>

      {/* Recent Activity */}
      <RecentActivitySection activities={recentActivity} />
    </div>
  );
};

export default EventDashboardOverview;