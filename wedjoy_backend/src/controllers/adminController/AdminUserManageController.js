import User from '../../models/UserModel.js';
import Credential from '../../models/CredentialsModel.js';
import Messaging from '../../models/MessagingModel.js';
import Review from '../../models/ReviewModel.js';

// Fetch List of Users
const getUsers = async (req, res) => {
    try {
        const { role, status, date } = req.query;
        let filter = {};
        if (role) filter.role = role;
        if (status) filter.status = status;
        if (date) filter.registeredAt = { $gte: new Date(date) };

        const users = await User.findAll({ where: filter });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch User Details
const getUserDetails = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: [Review]
        });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Block a User
const blockUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.update({ status: 'blocked' }, { where: { id: user_id } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await Messaging.create({ userId: user_id, message: 'Your account has been blocked.' });
        res.json({ success: true, message: 'User blocked successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Unblock a User
const unblockUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.update({ status: 'active' }, { where: { id: user_id } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await Messaging.create({ userId: user_id, message: 'Your account has been unblocked.' });
        res.json({ success: true, message: 'User unblocked successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Change User Role
const changeUserRole = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { newRole } = req.body;
        const user = await Credential.update({ role: newRole }, { where: { userId: user_id } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, message: 'User role updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch User Engagement Stats
const getUserMetrics = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const activeUsers = await User.count({ where: { status: 'active' } });
        const reportedUsers = await User.count({ where: { status: 'reported' } });
        
        res.json({
            success: true,
            metrics: { totalUsers, activeUsers, reportedUsers }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default{
    getUsers,
    getUserDetails,
    blockUser,
    unblockUser,
    changeUserRole,
    getUserMetrics
};



{
  /*
    ________________________________________
1️⃣    GET /admin/users → Fetch List of Users
Purpose:
•	Retrieves a list of all registered users.
•	Allows filtering users based on role, status (active/blocked), and registration date.
•	Helps admins track user base growth and identify inactive or problematic accounts.
Optional Query Parameters:
•	role → Filter users by role (user, business_owner, event_organizer, admin).
•	status → Retrieve only active or blocked users.
•	date → Fetch users registered on or after a specific date.
How It Works:
•	Queries the User model with filters.
•	Returns a list of user profiles.
Response Example:
json
CopyEdit
{
  "success": true,
  "users": [
    {
      "id": 101,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "user",
      "status": "active",
      "registeredAt": "2025-01-10"
    },
    {
      "id": 102,
      "name": "Bob Williams",
      "email": "bob@example.com",
      "role": "business_owner",
      "status": "blocked",
      "registeredAt": "2025-02-05"
    }
  ]
}
________________________________________
2️⃣ GET /admin/users/{user_id} → Fetch User Details
Purpose:
•	Retrieves detailed information about a specific user.
•	Helps admins review user history, engagement stats, and past issues.
•	Allows background checks before upgrading roles or handling disputes.
How It Works:
•	Fetches user details from User and associated models (Review & Rating for user feedback).
•	Returns detailed user information.
Response Example:
json
CopyEdit
{
  "success": true,
  "user": {
    "id": 101,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "event_organizer",
    "status": "active",
    "registeredAt": "2025-01-10",
    "totalEventsCreated": 15,
    "totalReviewsReceived": 45,
    "averageRating": 4.8
  }
}
________________________________________
3️⃣ PATCH /admin/users/{user_id}/block → Block a User
Purpose:
•	Restricts a user from logging in, creating events, or engaging in community activities.
•	Used when users violate platform rules, spam, or post inappropriate content.
•	Helps maintain a safe and high-quality user environment.
How It Works:
•	Updates the user’s status from active → blocked.
•	Sends a notification via the Messaging model to inform the user.
•	Prevents the user from logging in (by modifying the Credential model).
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "User has been blocked successfully"
}
________________________________________
4️⃣ PATCH /admin/users/{user_id}/unblock → Unblock a User
Purpose:
•	Restores access to previously blocked users.
•	Used when an appeal is successful or if the block was mistakenly applied.
•	Helps re-engage users who have been wrongfully suspended.
How It Works:
•	Updates the user’s status from blocked → active.
•	Notifies the user about their restored access.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "User has been unblocked successfully"
}
________________________________________
5️⃣ PATCH /admin/users/{user_id}/role → Change User Role
Purpose:
•	Allows admins to promote or demote users.
•	Useful for upgrading users to business owners or event organizers.
•	Helps in demoting inactive or misbehaving users.
Allowed Role Changes:
•	user ↔ business_owner
•	user ↔ event_organizer
•	business_owner ↔ admin (restricted to super admin)
Request Body Example:
json
CopyEdit
{
  "newRole": "event_organizer"
}
How It Works:
•	Updates the Credential model to reflect the new role.
•	Sends a notification to inform the user.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "User role updated successfully"
}
________________________________________
6️⃣ GET /admin/users/metrics → Fetch User Engagement Stats
Purpose:
•	Provides insights into user activity on WedJoy.
•	Helps track active users, engagement trends, and user growth.
•	Identifies low-activity users for re-engagement campaigns.
Data Returned:
•	totalUsers → Total registered users.
•	activeUsers → Users who logged in within the past 30 days.
•	userGrowth → New users over time.
•	topContributors → Users with the highest event engagements.
•	reportedUsers → Count of flagged users.
How It Works:
•	Aggregates data from the User and Review & Rating models.
•	Returns statistics for admin analysis.
Response Example:
json
CopyEdit
{
  "success": true,
  "metrics": {
    "totalUsers": 15000,
    "activeUsers": 8500,
    "userGrowth": [
      { "month": "January", "newUsers": 1200 },
      { "month": "February", "newUsers": 1400 }
    ],
    "topContributors": [
      { "user": "Alice Johnson", "eventsHosted": 30 },
      { "user": "David Smith", "eventsHosted": 25 }
    ],
    "reportedUsers": 45
  }
}


    */
}
