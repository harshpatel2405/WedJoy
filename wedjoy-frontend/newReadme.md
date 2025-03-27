1. Credential Model (For authentication)
Purpose: Stores login credentials and authentication details for all user roles.
Fields:
•	id (UUID, Primary Key) – Unique identifier
•	email (String, Unique) – User email for login
•	password_hash (String) – Hashed password
•	role (Enum: User, Business Owner, Event Organizer, Admin) – Defines user role
•	is_verified (Boolean) – Whether email is verified
•	created_at (Timestamp) – Account creation time
•	updated_at (Timestamp) – Last update timestamp
________________________________________
2. UserProfile Model (For community members)
Purpose: Stores personal details of general users.
Fields:
•	user_id (UUID, Primary Key, Foreign Key → Credential Model)
•	full_name (String) – User’s full name
•	profile_picture (String, URL) – Profile image link
•	bio (String) – Short bio or about section
•	location (String) – User’s city/locality
•	interests (Array of Strings) – Categories of interest
•	participation_history (Array of UUIDs) – List of past events attended
•	joined_at (Timestamp) – When user joined the platform
________________________________________
3. BusinessProfile Model (For business owners)
Purpose: Stores business information and promotions.
Fields:
•	business_id (UUID, Primary Key, Foreign Key → Credential Model)
•	business_name (String, Unique) – Name of the business
•	owner_name (String) – Owner’s name
•	business_type (Enum: Restaurant, Retail, Services, etc.)
•	address (String) – Business location
•	contact_number (String) – Phone number
•	email (String) – Contact email
•	website (String, URL) – Business website
•	description (Text) – Brief about the business
•	images (Array of URLs) – Business photos
•	operating_hours (JSON) – Open-close timings for each day
•	promotions (Array of Strings) – Discounts, special offers
________________________________________
4. EventOrganizerProfile Model (For event organizers)
Purpose: Stores event organizer details and event history.
Fields:
•	organizer_id (UUID, Primary Key, Foreign Key → Credential Model)
•	full_name (String) – Name of the organizer
•	organization_name (String, Optional) – If they represent an entity
•	contact_number (String) – Contact number
•	email (String) – Contact email
•	experience (String) – Years of experience in organizing events
•	past_events (Array of UUIDs) – List of past events organized
•	credibility_score (Float) – Based on user ratings & reviews
________________________________________
5. Event Model (For event management)
Purpose: Stores event details and tracking.
Fields:
•	event_id (UUID, Primary Key)
•	title (String) – Event title
•	description (Text) – Event details
•	organizer_id (UUID, Foreign Key → EventOrganizerProfile)
•	category (Enum: Music, Sports, Volunteering, etc.)
•	location (String) – Event address
•	latitude (Float) – For map integration
•	longitude (Float) – For map integration
•	date_time (Timestamp) – When the event starts
•	duration (Integer, in minutes) – Event duration
•	max_attendees (Integer) – Max allowed participants
•	price (Float, Optional) – If ticketed
•	status (Enum: Pending, Approved, Cancelled, Completed)
________________________________________
6. RSVP & Event Registration Model
Purpose: Tracks attendees and their RSVP status.
Fields:
•	registration_id (UUID, Primary Key)
•	event_id (UUID, Foreign Key → Event Model)
•	user_id (UUID, Foreign Key → UserProfile)
•	status (Enum: Going, Interested, Not Going)
•	registered_at (Timestamp)
________________________________________
7. Review & Rating Model
Purpose: Users can provide ratings and feedback.
Fields:
•	review_id (UUID, Primary Key)
•	user_id (UUID, Foreign Key → UserProfile)
•	entity_type (Enum: Business, Event) – What is being reviewed
•	entity_id (UUID) – Business/Event ID
•	rating (Integer, 1-5) – Star rating
•	comment (Text) – Feedback
•	created_at (Timestamp)
________________________________________
8. CommunityPost Model
Purpose: Users can share news, updates, and discussions.
Fields:
•	post_id (UUID, Primary Key)
•	user_id (UUID, Foreign Key → UserProfile)
•	content (Text) – Post body
•	media (Array of URLs) – Images/videos
•	location_tag (String) – If the post is location-specific
•	created_at (Timestamp)
________________________________________
9. Comment Model
Purpose: Users can comment on community posts.
Fields:
•	comment_id (UUID, Primary Key)
•	post_id (UUID, Foreign Key → CommunityPost)
•	user_id (UUID, Foreign Key → UserProfile)
•	text (Text) – Comment content
•	created_at (Timestamp)
________________________________________
10. Messaging Model (Includes Notifications)
Purpose: Enables private messaging and system notifications.
Fields:
•	message_id (UUID, Primary Key)
•	sender_id (UUID, Foreign Key → UserProfile)
•	receiver_id (UUID, Foreign Key → UserProfile)
•	content (Text) – Message body
•	is_read (Boolean) – Read status
•	sent_at (Timestamp)
🔹 Also used for notifications (e.g., "Your event was approved").
________________________________________
11. AdminModeration Model
Purpose: Admins review and approve/reject content.
Fields:
•	moderation_id (UUID, Primary Key)
•	admin_id (UUID, Foreign Key → Credential Model)
•	entity_type (Enum: Event, Post, Business)
•	entity_id (UUID)
•	action_taken (Enum: Approved, Rejected, Flagged)
•	reason (Text) – Reason for action
________________________________________
12. VolunteerOpportunity Model
Purpose: Stores nonprofit volunteering events.
Fields:
•	volunteer_id (UUID, Primary Key)
•	title (String)
•	description (Text)
•	organization_id (UUID, Foreign Key → BusinessProfile)
•	location (String)
•	date_time (Timestamp)
•	max_volunteers (Integer)
________________________________________
13. Report & Flagging Model
Purpose: Users can report inappropriate content.
Fields:
•	report_id (UUID, Primary Key)
•	reported_by (UUID, Foreign Key → UserProfile)
•	entity_type (Enum: Post, Event, Message)
•	entity_id (UUID)
•	reason (Enum: Spam, Inappropriate, Harassment, Fake)
•	status (Enum: Pending, Resolved, Rejected)
•	created_at (Timestamp)

