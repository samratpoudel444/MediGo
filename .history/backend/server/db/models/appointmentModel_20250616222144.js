import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v >= new Date();
        },
        message: "Appointment date must be in the future",
      },
    },
    patientAge: {
      type: Number,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
      enum: [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
      ],
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    appointmentType: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index(
	{ patientId: 1, doctorId: 1, appointmentDate: 1, timeSlot: 1 },
	{ unique: true }
);

const AppointmentTable = mongoose.model("Appointment", appointmentSchema);

export default AppointmentTable;
