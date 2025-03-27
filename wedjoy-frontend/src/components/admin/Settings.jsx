import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Settings as SettingsIcon, 
  CreditCard ,
  Home,
  ChevronRight
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for settings
  const mockSettings = {
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Super Administrator'
    },
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    systemSettings: {
      contentPolicy: 'Strict',
      userRoles: [
        { name: 'Admin', permissions: 'Full Access' },
        { name: 'Moderator', permissions: 'Limited Access' }
      ]
    },
    security: {
      twoFactorAuth: true,
      apiAccessKeys: ['key-1234-5678']
    }
  };

  // Render different setting sections
  const renderSettingSection = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2" /> Admin Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-md">{mockSettings.profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-md">{mockSettings.profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-md">{mockSettings.profile.role}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Edit Profile
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="mr-2" /> Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={mockSettings.notifications.email}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>SMS Notifications</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={mockSettings.notifications.sms}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Push Notifications</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={mockSettings.notifications.push}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <SettingsIcon className="mr-2" /> System Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Content Policy</label>
                <p className="mt-1 text-md">{mockSettings.systemSettings.contentPolicy}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Roles</label>
                <table className="w-full mt-2 border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Role</th>
                      <th className="border p-2 text-left">Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSettings.systemSettings.userRoles.map((role, index) => (
                      <tr key={index}>
                        <td className="border p-2">{role.name}</td>
                        <td className="border p-2">{role.permissions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Two-Factor Authentication</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={mockSettings.security.twoFactorAuth}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Access Keys</label>
                <div className="mt-2 bg-gray-100 p-2 rounded">
                  {mockSettings.security.apiAccessKeys.map((key, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      <span className="text-sm">{key}</span>
                      <button className="text-red-500 text-sm">Revoke</button>
                    </div>
                  ))}
                </div>
                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Generate New Key
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6">Admin Settings</h1> */}
        <div className="flex items-center text-gray-600">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          <span className="mr-2 text-sm">Home</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="mr-2 text-sm text-gray-500">Admin</span>
          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Settings</span>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`w-full text-left p-2 rounded flex items-center ${
                  activeTab === 'profile' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <User className="mr-2" /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')} 
                className={`w-full text-left p-2 rounded flex items-center ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Bell className="mr-2" /> Notifications
              </button>
              <button 
                onClick={() => setActiveTab('system')} 
                className={`w-full text-left p-2 rounded flex items-center ${
                  activeTab === 'system' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <SettingsIcon className="mr-2" /> System
              </button>
              <button 
                onClick={() => setActiveTab('security')} 
                className={`w-full text-left p-2 rounded flex items-center ${
                  activeTab === 'security' 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Shield className="mr-2" /> Security
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="col-span-3">
            {renderSettingSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
