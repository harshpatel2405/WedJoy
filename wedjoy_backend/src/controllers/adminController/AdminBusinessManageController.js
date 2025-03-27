import BusinessOwner from "../../models/BusinessOwnerModel.js";
import Revenue from "../../models/RevenueModel.js";
import Review from "../../models/ReviewModel.js";

//API  Fetch List of Businesses
const getBusinesses = async (req, res) => {
  try {
    const { status, category, date } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (date) filter.createdAt = { $gte: new Date(date) };

    const businesses = await BusinessOwner.findAll({ where: filter });
    res.json({ success: true, data: businesses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API  Fetch BusinessOwner Details
const getBusinessDetails = async (req, res) => {
  try {
    const { business_id } = req.params;
    const business = await BusinessProfile.findByPk(business_id, {
      include: [Revenue, Review],
    });
    if (!business)
      return res
        .status(404)
        .json({ success: false, message: "BusinessOwner not found" });
    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  API  Approve BusinessOwner
const approveBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const business = await BusinessProfile.update(
      { status: "approved" },
      { where: { id: business_id } }
    );
    if (!business)
      return res
        .status(404)
        .json({ success: false, message: "BusinessOwner not found" });
    res.json({ success: true, message: "BusinessOwner approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API  Reject BusinessOwner
const rejectBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const { reason } = req.body;
    const business = await BusinessProfile.update(
      { status: "rejected", rejectionReason: reason },
      { where: { id: business_id } }
    );
    if (!business)
      return res
        .status(404)
        .json({ success: false, message: "BusinessOwner not found" });
    res.json({ success: true, message: "BusinessOwner rejected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API  Edit BusinessOwner Details
const editBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const updatedData = req.body;
    const business = await BusinessProfile.update(updatedData, {
      where: { id: business_id },
    });
    if (!business)
      return res
        .status(404)
        .json({ success: false, message: "BusinessOwner not found" });
    res.json({ success: true, message: "BusinessOwner updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API  Fetch BusinessOwner Revenue Data
const getBusinessRevenue = async (req, res) => {
  try {
    const revenueData = await Revenue.findAll();
    res.json({ success: true, data: revenueData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getBusinesses,
  getBusinessDetails,
  approveBusiness,
  rejectBusiness,
  editBusiness,
  getBusinessRevenue,
};


{/* 
  
 1. GET /admin/businesses → Fetch List of Businesses
🔹 Purpose:
Retrieves all registered businesses on the platform.
Allows admins to filter businesses based on approval status, category, or date of registration.
Helps admins to identify pending approvals, flagged businesses, or high-performing vendors.
🔹 Required Query Parameters (Optional)
status: Filter businesses by pending, approved, rejected.
category: Retrieve businesses based on their service type (e.g., catering, photography, event management).
date: Fetch businesses registered on a specific date or after a certain period.
🔹 Data Returned:
BusinessOwner name, owner details, category, location, approval status, ratings, and revenue generated.
2️⃣ GET /admin/businesses/{business_id} → Fetch BusinessOwner Details
🔹 Purpose:
Retrieves complete details of a specific business.
Helps admins review business authenticity before approving or rejecting them.
Displays reviews, ratings, earnings, and engagement statistics for the business.
🔹 Data Returned:
General Info: BusinessOwner name, owner details, contact information, description.
Verification Info: BusinessOwner registration documents, approval status.
Performance Metrics: Total revenue, number of bookings, customer reviews & ratings.
3️⃣ PATCH /admin/businesses/{business_id}/approve → Approve BusinessOwner
🔹 Purpose:
Approves a business profile, allowing it to be listed publicly and accept customer bookings.
Ensures businesses meet platform standards before being available to users.
Notifies the business owner upon approval.
🔹 How It Works?
Updates the business status from "pending" → "approved".
Triggers an email/SMS notification to the business owner.
4️⃣ PATCH /admin/businesses/{business_id}/reject → Reject BusinessOwner
🔹 Purpose:
Rejects a business application if it does not meet platform guidelines.
Helps keep the platform safe from fraudulent businesses.
Provides a reason for rejection.
🔹 How It Works?
Updates the business status from "pending" → "rejected".
Stores an admin-provided rejection reason (e.g., incomplete documents, low credibility).
Notifies the business owner about rejection via email/SMS.
5️⃣ PATCH /admin/businesses/{business_id}/edit → Edit BusinessOwner Details
🔹 Purpose:
Allows admins to update business information (if required).
Useful for correcting business details, contact info, or category misclassification.
Can be used when a business requests an update due to location changes, service expansion, or new ownership.
🔹 What Can Be Edited?
BusinessOwner name, contact details, location, description, images.
Category (e.g., shifting from "Event Planner" to "Catering Service").
Operating hours, pricing, services offered.
6️⃣ GET /admin/businesses/revenue → Fetch BusinessOwner Revenue Data
🔹 Purpose:
Provides insights into revenue generated by businesses.
Helps in tracking high-performing vendors and identifying low-performing ones.
Useful for analytics, financial reporting, and taxation compliance.
🔹 Data Returned:
Total revenue generated across all businesses.
Revenue breakdown per business (top-performing businesses).
Earnings over time (weekly/monthly/yearly trends).
Commission data (if the platform takes a cut from business earnings).
  */}