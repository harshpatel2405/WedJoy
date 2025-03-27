import Event from "../../models/Event.js";
import RSVP from "../../models/RSVPModel.js";

//API  Fetch all events
const getAllEvents = async (req, res) => {
  try {
    const { status, date } = req.query;
    let filters = {};
    if (status) filters.status = status;
    if (date) filters.date = { $gte: new Date(date) };

    const events = await Event.find(filters);
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch events", error });
  }
};

//API  Fetch details of a specific event
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching event", error });
  }
};

//API  Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.event_id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting event", error });
  }
};

// API  Approve an event
const approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.event_id,
      { status: "approved" },
      { new: true }
    );
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Event approved", data: event });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error approving event", error });
  }
};

// API  Reject an event
const rejectEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.event_id,
      { status: "rejected" },
      { new: true }
    );
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Event rejected", data: event });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error rejecting event", error });
  }
};

// API  Fetch engagement stats (attendees, RSVPs, etc.)
const getEventInsights = async (req, res) => {
  try {
    const event = await Event.findById(req.params.event_id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const attendeesCount = await RSVP.countDocuments({
      eventId: req.params.event_id,
      status: "going",
    });
    const interestedCount = await RSVP.countDocuments({
      eventId: req.params.event_id,
      status: "interested",
    });

    res.status(200).json({
      success: true,
      data: {
        total_attendees: attendeesCount,
        interested_users: interestedCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching event insights",
      error,
    });
  }
};

export default {
  getAllEvents,
  getEventById,
  deleteEvent,
  approveEvent,
  rejectEvent,
  getEventInsights,
};

{/*
  1️⃣ GET /admin/events → Fetch List of Events
Purpose:
•	Retrieves all events created on the platform.
•	Allows filtering based on event status, category, or date.
•	Helps admins identify pending approvals, flagged events, or high-performing events.
Optional Query Parameters:
•	status → Filter events by pending, approved, or rejected.
•	category → Retrieve events based on their type (e.g., Music, Sports, Workshops).
•	date → Fetch events created on or after a specific date.
How It Works:
•	Queries the Event model with the applied filters.
•	Returns an array of event objects.
Response Example:
json
CopyEdit
{
  "success": true,
  "events": [
    {
      "id": 101,
      "name": "Tech Conference 2025",
      "category": "Technology",
      "date": "2025-04-10",
      "status": "approved"
    },
    {
      "id": 102,
      "name": "Music Fest",
      "category": "Music",
      "date": "2025-05-15",
      "status": "pending"
    }
  ]
}
________________________________________
2️⃣ GET /admin/events/{event_id} → Fetch Event Details
Purpose:
•	Retrieves detailed information about a specific event.
•	Helps admins review an event’s authenticity before approving or rejecting it.
•	Displays event insights such as total RSVPs and earnings (if monetized).
How It Works:
•	Fetches event details from the Event model using event_id.
•	Includes associated data like RSVP count and revenue (if applicable).
Response Example:
json
CopyEdit
{
  "success": true,
  "event": {
    "id": 101,
    "name": "Tech Conference 2025",
    "organizer": "XYZ Events",
    "date": "2025-04-10",
    "category": "Technology",
    "status": "approved",
    "description": "A tech conference with top industry speakers.",
    "totalRSVPs": 500,
    "revenueGenerated": 25000
  }
}
________________________________________
3️⃣ POST /admin/events → Create a New Event
Purpose:
•	Allows admins to manually create events.
•	Useful when an event is sponsored, promoted, or officially hosted by WedJoy.
Required Request Body:
json
CopyEdit
{
  "name": "Startup Pitch Event",
  "organizer": "WedJoy Official",
  "date": "2025-06-20",
  "category": "Business",
  "description": "A startup pitch competition for new entrepreneurs.",
  "location": "San Francisco",
  "ticketPrice": 20
}
How It Works:
•	Saves event data to the Event model.
•	Returns confirmation once successfully created.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "Event created successfully",
  "eventId": 201
}
________________________________________
4️⃣ PUT /admin/events/{event_id} → Edit Event Details
Purpose:
•	Allows admins to modify event details in case of incorrect information, rescheduling, or updates.
•	Useful if an organizer requests changes to an event.
Editable Fields:
•	Event name, date, category, description.
•	Location, ticket price, images, or additional details.
Request Body Example:
json
CopyEdit
{
  "date": "2025-07-15",
  "location": "Los Angeles",
  "ticketPrice": 25
}
How It Works:
•	Updates the specified event record in the Event model.
•	Returns a success message upon successful update.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "Event updated successfully"
}
________________________________________
5️⃣ DELETE /admin/events/{event_id} → Delete an Event
Purpose:
•	Removes an event from the platform if it violates policies, is flagged as spam, or is canceled by the organizer.
•	Helps keep the platform clean and credible.
How It Works:
•	Finds the event by event_id and deletes it.
•	Returns a success message.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "Event deleted successfully"
}
________________________________________
6️⃣ PATCH /admin/events/{event_id}/approve → Approve an Event
Purpose:
•	Marks an event as approved, making it publicly visible and open for bookings.
•	Ensures only valid events go live on the platform.
How It Works:
•	Updates the status of the event from pending → approved.
•	Notifies the event organizer via email.
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "Event approved successfully"
}
________________________________________
7️⃣ PATCH /admin/events/{event_id}/reject → Reject an Event
Purpose:
•	Rejects an event if it does not meet platform guidelines (e.g., fake events, misleading content, inappropriate themes).
•	Keeps the platform safe from spam or fraudulent events.
How It Works:
•	Updates the event’s status from pending → rejected.
•	Stores an admin-provided reason for rejection.
•	Sends a notification to the event organizer.
Request Body Example:
json
CopyEdit
{
  "reason": "Event description contains misleading information."
}
Response Example:
json
CopyEdit
{
  "success": true,
  "message": "Event rejected successfully"
}
________________________________________
8️⃣ GET /admin/events/{event_id}/insights → Fetch Event Engagement Stats
Purpose:
•	Provides insights into event performance.
•	Helps admins track event popularity, RSVP counts, and revenue.
How It Works:
•	Fetches data from the RSVP and Revenue models.
•	Returns total RSVPs, engagement stats, and earnings.
Response Example:
json
CopyEdit
{
  "success": true,
  "eventInsights": {
    "totalRSVPs": 800,
    "totalRevenue": 40000,
    "averageRating": 4.5,
    "topReviews": [
      { "user": "John Doe", "comment": "Great event!", "rating": 5 },
      { "user": "Jane Smith", "comment": "Loved the networking opportunities.", "rating": 4.5 }
    ]
  }
}


  */}
