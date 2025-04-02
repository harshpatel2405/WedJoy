
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


// Import components
import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import Dashboard_Overview from './components/admin/Dashboard_Overview';
import Manage_Events from './components/admin/Manage_Events';
import Manage_Businesses from './components/admin/Manage_Businesses';
import User_Management from './components/admin/User_Management';
import Reports_Analytics from './components/admin/Reports_Analytics';
import Settings from './components/admin/Settings';
import Content_Moderation from './components/admin/Content_Moderation';
import AdminProfile from './components/admin/AdminProfile.jsx';
import Login from './components/auth/Login';
import Home from './pages/preLogin/Home.jsx';
import NotFound from './components/common/NotFound.jsx';
import EventOrganizerSidebar from './eventOrganizer/EventOrganizerSidebar.jsx';
import Event_Dashboard_Overview from './components/event-organizer/Event_Dashboard_Overview.jsx';
import EventOrganizer_Manage_Events from './components/event-organizer/EventOrganizer_Manage_Events.jsx';
import Event_Communication from './components/event-organizer/Event_Communication.jsx';
import Event_Analytics from './components/event-organizer/Event_Analytics.jsx';
import Volunteer_Charity_Opportunities from './components/event-organizer/Volunteer_Charity_Opportunities.jsx';
import Event_Settings from './components/event-organizer/Event_Settings.jsx';
import UserSignup from "./components/auth/UserSignup";
import HeaderPreLogin from "./components/layouts/HeaderPreLogin";
import ForgotPasswordPage from './components/auth/ForgotPasswordPage.jsx';
import VerifyEmailPage from './components/auth/VerifyEmailPage.jsx';
import EventOrganizerSignup from './components/auth/EventOrganizerSignup.jsx';
import BusinessOwnerSignup from './components/auth/BusinessOwnerSignup.jsx';

import Business_Dashboard_Overview from './components/businessOwner/Business_Dashboard_Overview.jsx';
import Business_Manage_Business from './components/businessOwner/Business_Manage_Business.jsx';
import Business_Promotions_Ads from './components/businessOwner/Business_Promotions_Ads.jsx';
import Business_Event_Management from './components/businessOwner/Business_Event_Management.jsx';
import Business_Order_Bookings from './components/businessOwner/Business_Order_Bookings.jsx';
import Business_Customer_Interactions from './components/businessOwner/Business_Customer_Interactions.jsx';
import Business_Reports_Analytics from './components/businessOwner/Business_Reports_Analytics.jsx'; 
import Business_Profile from './components/businessOwner/Business_Profile.jsx';
import ResetPasswordDemo from './resetPasswordDemo.jsx';
import Music from './category/Music.jsx';
import GetDetails from './category/GetDetails.jsx';
import PaymentQRPage from './PaymentsQRPage.jsx';
import { ToastContainer } from 'react-toastify';



const AppRoutes = () => {
  // Get the current path
  const currentPath = window.location.pathname;

 <ToastContainer/>
  const isPreLoginRoute = ['/login', '/', '/signup'].includes(currentPath);

  const isAdminOrEventOrganizerRoute =
    currentPath.startsWith('/admin') || currentPath.startsWith('/eventOrganizer') || currentPath.startsWith('/businessOwner') 
  return (
    <>
    <ToastContainer/>
      {/* Conditionally render HeaderPreLogin or AdminHeader */}
      {isPreLoginRoute ? <HeaderPreLogin /> : isAdminOrEventOrganizerRoute ? <AdminHeader /> : null}
{/* <HeaderPreLogin/> */}
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminSidebar />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard_Overview />} />
          <Route path="manage-events" element={<Manage_Events />} />
          <Route path="manage-businesses" element={<Manage_Businesses />} />
          <Route path="user-management" element={<User_Management />} />
          <Route path="reports-analytics" element={<Reports_Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="content-moderation" element={<Content_Moderation />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Event Organizer Routes */}
        <Route path="/eventOrganizer" element={<EventOrganizerSidebar />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Event_Dashboard_Overview />} />
          <Route path="manage-events" element={<EventOrganizer_Manage_Events />} />
          <Route path="event-communication" element={<Event_Communication />} />
          <Route path="event-analytics" element={<Event_Analytics />} />
          <Route path="volunteer&CharityOpportunities" element={<Volunteer_Charity_Opportunities />} />
          <Route path="settings" element={<Event_Settings />} />
        </Route>

         {/* Business Owner Routes */}
         <Route path="/businessOwner" element={<AdminSidebar />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Business_Dashboard_Overview />} />
          <Route path="manage-business" element={<Business_Manage_Business />} />
          <Route path="promotions-ads" element={<Business_Promotions_Ads />} />
          <Route path="event-management" element={<Business_Event_Management />} />
          <Route path="orders-bookings" element={<Business_Order_Bookings />} />
          <Route path="customer-interaction" element={<Business_Customer_Interactions />} />
          <Route path="analytics-reports" element={<Business_Reports_Analytics />} />
          <Route path="profile" element={<Business_Profile />} />
          
        </Route>

        {/* Common Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/eventOrganizerSignup" element={<EventOrganizerSignup />} />
        <Route path="/businessOwnerSignup" element={<BusinessOwnerSignup />} />
       
        <Route path="/" element={<Home />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/resetPassword/:token" element={<ResetPasswordDemo />} />
        

        {/* Categories*/}
        <Route path='/category/:category' element={<Music />} /> 
        <Route path='/getDetails/:id' element={<GetDetails/>} />  
        <Route path='/payment' element={<PaymentQRPage/>} />   

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;