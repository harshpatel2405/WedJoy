import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const submitHandler = (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log(data);
      setLoading(false);
      alert("Event submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add Event</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
            {/* Section 1: Event Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Name</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventName", { required: true })}
                  />
                  {errors.eventName && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Category</label>
                  <select
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventCategory", { required: true })}
                  >
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="concert">Concert</option>
                  </select>
                  {errors.eventCategory && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Event Description</label>
                  <textarea
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    {...register("eventDescription", { required: true })}
                  />
                  {errors.eventDescription && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventStartDate", { required: true })}
                  />
                  {errors.eventStartDate && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventEndDate", { required: true })}
                  />
                  {errors.eventEndDate && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventStartTime", { required: true })}
                  />
                  {errors.eventStartTime && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventEndTime", { required: true })}
                  />
                  {errors.eventEndTime && <span className="text-sm text-red-500">This field is required</span>}
                </div>
              </div>
            </section>

            {/* Section 2: Venue Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Venue Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Venue Name</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("venueName")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Venue Address</label>
                  <textarea
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                    {...register("venueAddress")}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Google Map Link</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("venueGoogleMapLink")}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Ticket Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Ticket Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ticket Price</label>
                  <input
                    type="number"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("ticketPrice")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Tickets</label>
                  <input
                    type="number"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("totalTickets", { required: true })}
                  />
                  {errors.totalTickets && <span className="text-sm text-red-500">This field is required</span>}
                </div>
              </div>
            </section>

            {/* Section 4: Organizer Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Organizer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organizer Name</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("organizerName", { required: true })}
                  />
                  {errors.organizerName && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organizer Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("organizerContactEmail", { required: true })}
                  />
                  {errors.organizerContactEmail && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organizer Phone</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("organizerContactPhone")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website Link</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("websiteLink")}
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Media & Policies */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Media & Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Banner Image</label>
                  <input
                    type="file"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("eventBannerImage")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gallery</label>
                  <input
                    type="file"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    multiple
                    {...register("gallery")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Promo Video Link</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    {...register("promoVideo")}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Refund Policy</label>
                  <textarea
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    {...register("refundPolicy")}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
                  <textarea
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    {...register("tnc", { required: true })}
                  />
                  {errors.tnc && <span className="text-sm text-red-500">This field is required</span>}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}