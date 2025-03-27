# Create the main directories under src/components
mkdir -p src/components/admin/
mkdir -p src/components/business-owner/
mkdir -p src/components/event-organizer/
mkdir -p src/components/user/

# Optionally, create empty files for each component
touch src/components/admin/Dashboard_Overview.jsx
touch src/components/admin/Manage_Events.jsx
touch src/components/admin/Manage_Businesses.jsx
touch src/components/admin/User_Management.jsx
touch src/components/admin/Content_Moderation.jsx
touch src/components/admin/Reports_Analytics.jsx
touch src/components/admin/Settings.jsx

touch src/components/business-owner/Dashboard_Overview.jsx
touch src/components/business-owner/Manage_Business_Profile.jsx
touch src/components/business-owner/Manage_Events.jsx
touch src/components/business-owner/Bookings_Inquiries.jsx
touch src/components/business-owner/Business_Analytics.jsx
touch src/components/business-owner/Customer_Reviews.jsx
touch src/components/business-owner/Settings.jsx

touch src/components/event-organizer/Dashboard_Overview.jsx
touch src/components/event-organizer/Manage_Events.jsx
touch src/components/event-organizer/Event_Communication.jsx
touch src/components/event-organizer/Event_Analytics.jsx
touch src/components/event-organizer/Volunteer_Charity_Opportunities.jsx
touch src/components/event-organizer/Settings.jsx

touch src/components/user/Dashboard_Overview.jsx
touch src/components/user/Discover_Events.jsx
touch src/components/user/Browse_Local_Businesses.jsx
touch src/components/user/Community_Feed.jsx
touch src/components/user/Volunteer_Opportunities.jsx
touch src/components/user/Settings.jsx

//Debug 
This code will Crate following structure and all files details are there in readme.md:
src/
 └── components/
      ├── admin/
      │    ├── Dashboard_Overview.jsx
      │    ├── Manage_Events.jsx
      │    ├── Manage_Businesses.jsx
      │    ├── User_Management.jsx
      │    ├── Content_Moderation.jsx
      │    ├── Reports_Analytics.jsx
      │    └── Settings.jsx
      ├── business-owner/
      │    ├── Dashboard_Overview.jsx
      │    ├── Manage_Business_Profile.jsx
      │    ├── Manage_Events.jsx
      │    ├── Bookings_Inquiries.jsx
      │    ├── Business_Analytics.jsx
      │    ├── Customer_Reviews.jsx
      │    └── Settings.jsx
      ├── event-organizer/
      │    ├── Dashboard_Overview.jsx
      │    ├── Manage_Events.jsx
      │    ├── Event_Communication.jsx
      │    ├── Event_Analytics.jsx
      │    ├── Volunteer_Charity_Opportunities.jsx
      │    └── Settings.jsx
      └── user/
           ├── Dashboard_Overview.jsx
           ├── Discover_Events.jsx
           ├── Browse_Local_Businesses.jsx
           ├── Community_Feed.jsx
           ├── Volunteer_Opportunities.jsx
           └── Settings.jsx
