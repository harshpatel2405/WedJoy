import express from "express";
const routes = express.Router();

// ****.....Admin Controllers.......***** //
import dashboard from "../controllers/adminController/DashboardController.js";
import Events from "../controllers/adminController/AdminEventController.js";
import Business from "../controllers/adminController/AdminBusinessManageController.js";
import User from '../controllers/adminController/AdminUserManageController.js'


//Routes : For Dashboard
routes.get("/dashboard/totalUsers", dashboard.getTotalUsers);
routes.get("/dashboard/userGrowth", dashboard.getUserGrowth);
routes.get("/dashboard/totalEvents", dashboard.getTotalEvents);
routes.get("/dashboard/eventCategories", dashboard.getEventCategories);
routes.get("/dashboard/getRecentEvents", dashboard.getRecentEvents);
routes.get("/dashboard/getTotalRevenue", dashboard.getTotalRevenue);
routes.get("/dashboard/getTotalActiveBusinesses",dashboard.getTotalActiveBusinesses);

//Routes : For Admin Events
routes.get("/events", Events.getAllEvents);
routes.get("/events/:id", Events.getEventById);
routes.delete("/events/:id", Events.deleteEvent);
routes.put("/events/approve/:id", Events.approveEvent);
routes.put("/events/reject/:id", Events.rejectEvent);
routes.get("/events/insights/:event_id", Events.getEventInsights);

//Routes : For Admin Business Manage
routes.get("/business/getBusinesses", Business.getBusinesses);
routes.get("/business/getBusinessDetails", Business.getBusinessDetails);
routes.put("/business/approveBusiness", Business.approveBusiness);
routes.put("/business/rejectBusiness", Business.rejectBusiness);
routes.put("/business/editBusiness", Business.editBusiness);
routes.get("/business/getBusinessRevenue", Business.getBusinessRevenue);

//Routes : For Admin User Manage
routes.get("/users/getUsers", User.getUsers);
routes.get("/users/getUserDetails", User.getUserDetails);
routes.put("/users/blockUser", User.blockUser);
routes.put("/users/unblockUser", User.unblockUser);
routes.put("/users/changeUserRole", User.changeUserRole);
routes.get("/users/getUserMetrics", User.getUserMetrics);

//Routes : For Admin Reports & Analytics


export default routes;

// https://chatgpt.com/c/67d15793-d2f8-800a-9e35-b5e4ac13bf8e
// https://chatgpt.com/c/67d15793-d2f8-800a-9e35-b5e4ac13bf8e
