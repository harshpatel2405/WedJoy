import Revenue from "../../models/Revenue.js";
import Event from "../../models/Event.js";
import RSVP from "../../models/RSVPModel.js";
import UserProfile from "../../models/UserModel.js";
import BusinessProfile from "../../models/BusinessOwnerModel.js";


const getRevenueReport = async (req, res) => {
  try {
    const { period } = req.query; // Expected values: daily, monthly, yearly
    let groupFormat = "%Y-%m-%d"; // Default: Daily report

    if (period === "monthly") groupFormat = "%Y-%m";
    if (period === "yearly") groupFormat = "%Y";

    const revenueData = await Revenue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({ success: true, data: revenueData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};


export const getEventAnalytics = async (req, res) => {
  try {
    const eventStats = await Event.aggregate([
      {
        $lookup: {
          from: "rsvps",
          localField: "_id",
          foreignField: "event",
          as: "attendees",
        },
      },
      {
        $project: {
          name: 1,
          category: 1,
          date: 1,
          organizer: 1,
          totalAttendees: { $size: "$attendees" },
        },
      },
      { $sort: { totalAttendees: -1 } },
    ]);

    res.status(200).json({ success: true, data: eventStats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @desc Fetch user activity insights (Logins, RSVPs, Engagement)
 * @route GET /admin/reports/users
 * @access Admin
 */
export const getUserActivityReport = async (req, res) => {
  try {
    const userActivity = await UserProfile.aggregate([
      {
        $lookup: {
          from: "rsvps",
          localField: "_id",
          foreignField: "user",
          as: "userEvents",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalRSVPs: { $size: "$userEvents" },
          lastLogin: 1,
        },
      },
      { $sort: { totalRSVPs: -1 } },
    ]);

    res.status(200).json({ success: true, data: userActivity });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @desc Fetch business performance analytics (Revenue, Ratings, Top Vendors)
 * @route GET /admin/reports/businesses
 * @access Admin
 */
export const getBusinessPerformance = async (req, res) => {
  try {
    const businessStats = await BusinessProfile.aggregate([
      {
        $lookup: {
          from: "revenues",
          localField: "_id",
          foreignField: "business",
          as: "businessRevenue",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "business",
          as: "reviews",
        },
      },
      {
        $project: {
          name: 1,
          category: 1,
          totalRevenue: { $sum: "$businessRevenue.amount" },
          totalReviews: { $size: "$reviews" },
          averageRating: { $avg: "$reviews.rating" },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.status(200).json({ success: true, data: businessStats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
