import React, { useState, useEffect } from 'react';

const Event_Communication = () => {
  // Mock data for messages and events
  const [messages, setMessages] = useState([
    {
      id: 1,
      eventId: 101,
      attendeeName: 'Priya Singh',
      attendeeEmail: 'priya.singh@example.com',
      message: 'Hi, can you confirm my registration for the event?',
      timestamp: '2025-03-07T10:30:00Z',
    },
    {
      id: 2,
      eventId: 101,
      attendeeName: 'Rahul Verma',
      attendeeEmail: 'rahul.verma@example.com',
      message: 'What time does the event start?',
      timestamp: '2025-03-07T11:15:00Z',
    },
  ]);

  const [events] = useState([
    {
      id: 101,
      name: 'Tech Conference 2025',
      date: '2025-03-15',
      location: 'Bangalore, India',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [newMessage, setNewMessage] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      eventId: selectedEvent.id,
      attendeeName: 'Organizer',
      attendeeEmail: 'organizer@example.com',
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Handle sending a reminder
  const handleSendReminder = () => {
    if (!reminderMessage.trim()) return;

    alert(`Reminder sent for ${selectedEvent.name}: ${reminderMessage}`);
    setReminderMessage('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Event Communication</h1>

      {/* Event Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
        <select
          value={selectedEvent.id}
          onChange={(e) =>
            setSelectedEvent(events.find((event) => event.id === parseInt(e.target.value)))
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} ({event.date})
            </option>
          ))}
        </select>
      </div>

      {/* Direct Messaging Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Direct Messaging</h2>

        {/* Message List */}
        <div className="space-y-4 mb-6">
          {messages
            .filter((msg) => msg.eventId === selectedEvent.id)
            .map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg ${
                  msg.attendeeEmail === 'organizer@example.com'
                    ? 'bg-blue-50 ml-auto w-3/4'
                    : 'bg-gray-100 w-3/4'
                }`}
              >
                <p className="text-sm text-gray-700">{msg.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {msg.attendeeName} - {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
        </div>

        {/* New Message Input */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>

      {/* Send Reminders Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Send Reminders/Updates</h2>

        {/* Reminder Input */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
            placeholder="Type your reminder/update..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendReminder}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event_Communication;