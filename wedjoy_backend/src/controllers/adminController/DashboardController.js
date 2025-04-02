import User from "../../models/UserModel.js";
import Event from "../../models/Event.js";
import Business from "../../models/BusinessOwnerModel.js";
import Revenue from "../../models/RevenueModel.js";

// API  Get total user count
const getTotalUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});

    res.status(200).json({ totalUsers: userCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count", error });
  }
};

// API  Get user growth data
const getUserGrowth = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Get the total number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Generate an array of all days with count 0
    const baseDays = Array.from({ length: daysInMonth }, (_, i) => ({
      _id: i + 1,
      count: 0
    }));

    const startOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
    const endOfMonth = new Date(Date.UTC(currentYear, currentMonth, daysInMonth, 23, 59, 59));

    const growthData = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Merge growth data with base days
    const mergedData = baseDays.map(day => {
      const found = growthData.find(data => data._id === day._id);
      return found || day;
    });

    res.status(200).json({ growthData: mergedData });
  } catch (error) {
    console.error("Error in getUserGrowth:", error);
    res.status(500).json({
      message: "Error fetching daily user growth data",
      error: error.message
    });
  }
};



// API  Get total event count
const getTotalEvents = async (req, res) => {
  try {
    const eventCount = await Event.countDocuments();
    res.status(200).json({ totalEvents: eventCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event count", error });
  }
};

// API  Get event categories distribution 
const getEventCategories = async (req, res) => {
  try {
    const categoryData = await Event.aggregate([
      { $group: { _id: "$eventCategory", count: { $sum: 1 } } },
      { $project: { _id: 0, eventCategory: "$_id", count: 1 } } // Rename _id to category
    ]);
    
    res.status(200).json({ categories: categoryData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event categories", error });
  }
};


// API  Get recent events
const getRecentEvents = async (req, res) => {
  try {
    const recentEvents = await Event.find()
      .select('eventID _id eventName name organizerName organizer eventStartDate date status')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ recentEvents });
  } catch (error) {
    console.error("Error in getRecentEvents:", error);
    res.status(500).json({ 
      message: "Error fetching recent events", 
      error: error.message 
    });
  }
};

// API  Get total active businesses
const getTotalActiveBusinesses = async (req, res) => {
  try {
    const businessCount = await Business.countDocuments({ status: "active" });
    res.status(200).json({ totalActiveBusinesses: businessCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching business count", error });
  }
};

// API  Get total revenue
const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Revenue.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.status(200).json({ totalRevenue: totalRevenue[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total revenue", error });
  }
};

export default {
  getTotalUsers,
  getUserGrowth,
  getTotalEvents,
  getEventCategories,
  getRecentEvents,
  getTotalActiveBusinesses,
  getTotalRevenue,
};


{/*
  
 1.  GET /admin/stats/users → Fetch Total User Count
Purpose:
•	Retrieves the total number of users on the platform.
•	Helps admins monitor user base growth and overall engagement.
How It Works:
•	Fetches the count of users from the UserProfile model.
•	Returns a JSON response with the total number of users.
Response Example:
json
CopyEdit
{
  "success": true,
  "totalUsers": 10500
}
________________________________________
2️⃣ GET /admin/stats/events → Fetch Total Event Count
Purpose:
•	Provides the total number of events created on the platform.
•	Helps track the platform's engagement level.
How It Works:
•	Queries the Event model to count all events.
•	Returns the total event count.
Response Example:
json
CopyEdit
{
  "success": true,
  "totalEvents": 2300
}
________________________________________
3️⃣ GET /admin/stats/businesses → Fetch Total Active Businesses
Purpose:
•	Retrieves the total count of approved businesses.
•	Helps monitor active vendors.
How It Works:
•	Queries the BusinessProfile model with a filter for status: "approved".
•	Returns the number of active businesses.
Response Example:
json
CopyEdit
{
  "success": true,
  "activeBusinesses": 320
}
________________________________________
4️⃣ GET /admin/stats/revenue → Fetch Total Revenue
Purpose:
•	Fetches total revenue generated by businesses.
•	Useful for financial tracking and platform growth analysis.
How It Works:
•	Queries the Revenue model to sum all business earnings.
•	Returns the total revenue.
Response Example:
json
CopyEdit
{
  "success": true,
  "totalRevenue": 150000
}
________________________________________
5️⃣ GET /admin/events/recent → Fetch Latest Events
Purpose:
•	Provides a list of recently created events.
•	Helps admins track new activities on the platform.
How It Works:
•	Fetches events from the Event model, sorted by the most recent.
•	Returns a list of the latest events.
Response Example:
json
CopyEdit
{
  "success": true,
  "recentEvents": [
    { "id": 1, "name": "Music Fest", "date": "2025-03-10" },
    { "id": 2, "name": "Art Expo", "date": "2025-03-09" }
  ]
}
________________________________________
6️⃣ GET /admin/users/growth → Fetch User Growth Data for Charts
Purpose:
•	Provides data on user registration trends.
•	Useful for generating admin dashboard growth charts.
How It Works:
•	Queries the UserProfile model, grouping users by registration date.
•	Returns user growth data over time.
Response Example:
json
CopyEdit
{
  "success": true,
  "userGrowth": [
    { "date": "2025-03-01", "newUsers": 50 },
    { "date": "2025-03-02", "newUsers": 60 }
  ]
}
________________________________________
7️⃣ GET /admin/events/categories → Fetch Event Categories Distribution
Purpose:
•	Shows the distribution of events by category.
•	Helps admins understand popular event types.
How It Works:
•	Groups and counts events by category using the Event model.
•	Returns a breakdown of event categories.
Response Example:
json
CopyEdit
{
  "success": true,
  "categoryDistribution": {
    "Music": 120,
    "Sports": 90,
    "Workshops": 50
  }
}


  */}
