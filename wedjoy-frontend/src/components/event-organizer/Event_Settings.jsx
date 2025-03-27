import React, { useState, useEffect } from 'react';

const Event_Settings = () => {
  // State for organizer profile
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bio: '',
    avatarUrl: ''
  });

  // State for notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newRegistrationAlerts: true,
    paymentAlerts: true,
    eventReminders: true,
    marketingUpdates: false
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Mock API calls
  const fetchOrganizerProfile = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response with Indian data
    return {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      company: 'EventMasters India',
      bio: 'Experienced event organizer specializing in weddings, corporate events, and cultural festivals across India.',
      avatarUrl: 'data:image/jpeg;base64,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' // Demo image
    };
  };

  const fetchNotificationSettings = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock response
    return {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      newRegistrationAlerts: true,
      paymentAlerts: true,
      eventReminders: true,
      marketingUpdates: false
    };
  };

  const updateProfile = async (profileData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success (would validate and return errors in a real API)
    return { success: true };
  };

  const updateNotifications = async (notificationData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return success
    return { success: true };
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, notificationData] = await Promise.all([
          fetchOrganizerProfile(),
          fetchNotificationSettings()
        ]);
        
        setProfile(profileData);
        setNotifications(notificationData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading settings:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Save all settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Call both APIs in parallel
      await Promise.all([
        updateProfile(profile),
        updateNotifications(notifications)
      ]);
      
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      {saveMessage && (
        <div className={`p-4 mb-6 rounded ${saveMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSaveSettings}>
        {/* Profile Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Event Organizer Profile Settings</h2>
          
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="flex flex-col items-center">
                <img 
                  src={profile.avatarUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <button 
                  type="button"
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Change Photo
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Preferences Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notification Preferences</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Notification Channels</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-gray-700">
                  Email Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  name="pushNotifications"
                  checked={notifications.pushNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pushNotifications" className="ml-2 block text-gray-700">
                  Push Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={notifications.smsNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="smsNotifications" className="ml-2 block text-gray-700">
                  SMS Notifications
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-3">Notification Types</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newRegistrationAlerts"
                  name="newRegistrationAlerts"
                  checked={notifications.newRegistrationAlerts}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newRegistrationAlerts" className="ml-2 block text-gray-700">
                  New Registration Alerts
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="paymentAlerts"
                  name="paymentAlerts"
                  checked={notifications.paymentAlerts}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="paymentAlerts" className="ml-2 block text-gray-700">
                  Payment Alerts
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eventReminders"
                  name="eventReminders"
                  checked={notifications.eventReminders}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="eventReminders" className="ml-2 block text-gray-700">
                  Event Reminders
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketingUpdates" 
                  name="marketingUpdates"
                  checked={notifications.marketingUpdates}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="marketingUpdates" className="ml-2 block text-gray-700">
                  Marketing Updates
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Event_Settings;