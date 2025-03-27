import Event from "../models/Event.js";
import mongoose from 'mongoose';

export const getEventRsvps = async (req, res) => {
  console.log("Get Event Rsvps API Called..........")
  try {
    const getEventRsvps = await Event.findById(req.params.id).populate("rsvps");

    if(getEventRsvps==null){
      return res.status(404).json({
        message: "Event Not Found",
      });

    }
    res.status(200).json({

      message: "Event Rsvps Fetched Successfully",
      data: getEventRsvps.rsvps,
    });
    console.log("Event Rsvps Fetched Successfully ::: \n", getEventRsvps.rsvps);
  } catch (err) {
    res.status(500).json({
      message: "Network Error",
      data: err,
    });
  }
  console.log("Get Event Rsvps API Ended..........")
};

export const addEvent = async (req, res) => {
  console.log("Add Event API Called..........")
  try {
    const event = await Event.create(req.body);
    console.log("Event Added Successfully.................::::::::>>>>>>\n",event);

    res.status(201).json({
      message: "Event added succssfully..",
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Adding Event",
      data: err,
    });
  }
  console.log("Add Event API Ended..........")
};

export const getAllEvent = async (req, res) => {
  console.log("Get All Event API Called..........")
  try {
    const getEvents = await Event.find();

    if(getEvents.length==0){
      return res.status(404).json({
        message: "No Events Found",
      });
    }

    console.log("Events Fetched Successfully ::: \n", getEvents);
    res.status(200).json({
      message: "Events Fetched Successfully",
      data: getEvents,
    });
  } catch (err) {
    res.status(500).json({
      message: "Network Error",
      data: err,
    });
  }
  console.log("Get All Event API Ended..........")
};

export const getEventById = async (req, res) => {
  console.log("Get Event By Id API Called..........")
  try {
    const getEvent = await Event.findById(req.params.id);

    if(getEvent==null){
      return res.status(404).json({
        message: "Event Not Found",
      });
    }
    res.status(200).json({
      message: "Event Fetched Successfully",
      data: getEvent,
    });
    console.log("Event Fetched Successfully ::: \n", getEvent);
  } catch (err) {
    res.status(500).json({
      message: "Network Error",
      data: err,
    });
  }
  console.log("Get Event By Id API Ended..........")
};

export const updateEvent = async (req, res) => {
  console.log("Update Event API Called..........");
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Updated Successfully",
      data: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Updating Event",
      error: err.message,
    });
  }
  console.log("Update Event API Ended..........");
};

export const deleteEvent = async (req, res) => {
  console.log("Delete Event API Called..........")
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);

    if(!deleteEvent){
      return res.status(404).json({
        message: "Event Not Found",
      });
    }
    res.status(200).json({
      message: "Event Deleted Successfully",
      data: deleteEvent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Network Error",
      data: err,
    });
  }
  console.log("Delete Event API Ended..........")
}






// Constants (only keep what's needed)
const DEFAULT_PAGE_SIZE = 15; // 15 events per load

// Formatting function remains the same
const formatEventForFrontend = (event) => ({
  id: event._id,
  name: event.eventName,
  category: event.eventCategory,
  date: new Date(event.eventStartDate * 1000).toLocaleDateString('en-GB'), // Fixed epoch conversion
  price: event.ticketType === 'paid' ? `$${event.ticketPrice}` : 'Free',
  guests: [event.organizerName],
  image: event.eventBannerImage,
  details: event.eventDescription,
  organizer: event.organizerName,
  contact: event.organizerContactEmail,
  venue: event.venueName || 'Online Event',
  type: event.eventType
});

export const getEventsByCategory = async (req, res) => {
  const startTime = Date.now();
  const DEFAULT_LIMIT = 15; // 15 events per request

  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;

    // Case-insensitive exact match
    const query = { 
      eventCategory: { $regex: new RegExp(`^${category}$`, 'i') }
    };

    // Database operations (parallel)
    const [totalCount, events] = await Promise.all([
      Event.countDocuments(query),
      Event.find(query)
        .sort({ eventStartDate: -1 }) // Newest first
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    // Formatting
    const formatDate = (epoch) => {
      return new Date(epoch * 1000).toLocaleDateString('en-GB');
    };

    const response = {
      success: true,
      pagination: {
        totalEvents: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: page * limit < totalCount
      },
      events: events.map(event => ({
        id: event._id,
        name: event.eventName,
        date: formatDate(event.eventStartDate),
        price: event.ticketType === 'paid' ? `$${event.ticketPrice}` : 'Free',
        image: event.eventBannerImage,
        // ... other fields
      }))
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// Get event details by ID
export const getEventDetails = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid event ID' 
      });
    }

    const event = await Event.findById(req.params.id).lean();
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      event: formatEventForFrontend(event)
    });

  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event details'
    });
  }
};

// Get all available categories
export const getCategories = async (req, res) => {
  try {
    // Get distinct categories from database
    const categories = await Event.distinct('eventCategory');
    
    res.json({
      success: true,
      categories: categories.filter(c => c) // Remove any null/undefined
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};