import express from "express";
const routes = express.Router();
import { addEvent, getAllEvent, deleteEvent, getEventById, updateEvent, getEventsByCategory, getCategories, getEventDetails } from "../controllers/eventController.js";



routes.post("/addEvent", addEvent);
routes.get("/getAllEvent", getAllEvent);

routes.get("/getEventById/:id", getEventById);
routes.put("/updateEvent/:id", updateEvent);
routes.delete("/deleteEvent/:id", deleteEvent);



// Get events by category with pagination
routes.get('/category/:category', getEventsByCategory);

// Get single event details
routes.get('/:id', getEventDetails);

// Get all available categories
routes.get('/categories/all', getCategories);



export default routes;



