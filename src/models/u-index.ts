import Admin from "./admin.js";
import Mentee from "./mentee.js";
import Mentor from "./mentor.js";
import SessionBooking from "./sessionBooking.js";
import SessionFeedback from "./sessionFeedback.js";
import MentorshipRequest from "./mentorshipRequest.js";
import TimeSlot from "./timeSlot.js";


// Associations 
Mentor.hasMany(TimeSlot, {
  foreignKey: "mentorId",
  onDelete: "CASCADE",
  as: "timeSlots", // plural because hasMany
});
TimeSlot.belongsTo(Mentor, {
  foreignKey: "mentorId",
  onDelete: "CASCADE",
  as: "mentor",
});

// TimeSlot → SessionBooking
TimeSlot.hasOne(SessionBooking, {
  foreignKey: "timeSlotId",
  onDelete: "CASCADE",
  as: "sessionBooking",
});
SessionBooking.belongsTo(TimeSlot, {
  foreignKey: "timeSlotId",
  onDelete: "CASCADE",
  as: "timeSlot",
});

// Mentee → SessionBooking
Mentee.hasMany(SessionBooking, {
  foreignKey: "menteeId",
  onDelete: "CASCADE",
  as: "sessionBookings",
});
SessionBooking.belongsTo(Mentee, {
  foreignKey: "menteeId",
  onDelete: "CASCADE",
  as: "mentee",
});

// SessionBooking → SessionFeedback
SessionBooking.hasOne(SessionFeedback, {
  foreignKey: "sessionBookingId",
  onDelete: "CASCADE",
  as: "sessionFeedback",
});
SessionFeedback.belongsTo(SessionBooking, {
  foreignKey: "sessionBookingId",
  onDelete: "CASCADE",
  as: "sessionBooking",
});

// Mentor → MentorshipRequest
Mentor.hasMany(MentorshipRequest, {
  foreignKey: "mentorId",
  onDelete: "CASCADE",
  as: "mentorshipRequests",
});
MentorshipRequest.belongsTo(Mentor, {
  foreignKey: "mentorId",
  onDelete: "CASCADE",
  as: "mentor",
});

// Mentee → MentorshipRequest
Mentee.hasMany(MentorshipRequest, {
  foreignKey: "menteeId",
  onDelete: "CASCADE",
  as: "mentorshipRequests",
});
MentorshipRequest.belongsTo(Mentee, {
  foreignKey: "menteeId",
  onDelete: "CASCADE",
  as: "mentee",
});




export {
  Admin,
  Mentee,
  Mentor,
  SessionBooking,
  SessionFeedback,
  MentorshipRequest,
  TimeSlot,
};


