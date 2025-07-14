import AppointmentTable from "../../db/models/appointmentModel.js";
import UserTable from "../../db/models/userModels.js";

export const getAllAppointments = async (req, res, next) => {
    try {
        const doctorId = req.user.id;

        // Check if doctor exists
        const doctorExists = await UserTable.findById(doctorId);
        if (!doctorExists) {
            return next({ code: 404, message: "Doctor Not Found" });
        }

        // Different date formatting options
        const todayDate = new Date();
        
        // Option 1: ISO string (recommended for API responses)
        const isoDateString = todayDate.toISOString();
        console.log("ISO Date:", isoDateString);
        // Output: "2025-07-12T09:00:45.123Z"

        // Option 2: Date only (YYYY-MM-DD)
        const dateOnly = todayDate.toISOString().split('T')[0];
        console.log("Date Only:", dateOnly);
        // Output: "2025-07-12"

        // Option 3: Readable format
        const readableDate = todayDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        console.log("Readable Date:", readableDate);
        // Output: "July 12, 2025"

        // Option 4: Custom format for display
        const customDate = formatDate(todayDate, 'display');
        console.log("Custom Date:", customDate);

        // Get appointments with proper error handling
        const getAppointments = await AppointmentTable.find({})
            .populate("patientId")
            .sort({ appointmentDate: -1 }); // Sort by date, newest first

        // Better condition check (empty array is truthy)
        if (!getAppointments || getAppointments.length === 0) {
            return res.status(200).json({ 
                message: "No appointments found",
                data: [],
                count: 0
            });
        }

        // Format appointment dates for response
        const formattedAppointments = getAppointments.map(appointment => ({
            ...appointment.toObject(),
            appointmentDate: formatDate(appointment.appointmentDate, 'display'),
            createdAt: formatDate(appointment.createdAt, 'datetime')
        }));

        return res.status(200).json({
            message: "Appointments retrieved successfully",
            data: formattedAppointments,
            count: formattedAppointments.length,
            currentDate: readableDate
        });

    } catch (err) {
        console.error("Error in getAllAppointments:", err);
        return next({ 
            code: err.code || 500, 
            message: err.message || "Internal Server Error" 
        });
    }
};

// Utility function for date formatting
const formatDate = (date, format = 'iso') => {
    const d = new Date(date);
    
    switch (format) {
        case 'iso':
            return d.toISOString();
        case 'date':
            return d.toISOString().split('T')[0];
        case 'time':
            return d.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        case 'datetime':
            return d.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        case 'display':
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        case 'short':
            return d.toLocaleDateString('en-US');
        default:
            return d.toISOString();
    }
};

// Additional controller for today's appointments
export const getTodaysAppointments = async (req, res, next) => {
    try {
        const doctorId = req.user.id;

        // Get start and end of today
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        console.log("Start of day:", startOfDay.toISOString());
        console.log("End of day:", endOfDay.toISOString());

        const todaysAppointments = await AppointmentTable.find({
            doctorId: doctorId,
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).populate("patientId");

        return res.status(200).json({
            message: "Today's appointments retrieved successfully",
            data: todaysAppointments,
            count: todaysAppointments.length,
            date: formatDate(today, 'display')
        });

    } catch (err) {
        console.error("Error in getTodaysAppointments:", err);
        return next({ 
            code: err.code || 500, 
            message: err.message || "Internal Server Error" 
        });
    }
};

// Controller for appointments by date range
export const getAppointmentsByDateRange = async (req, res, next) => {
    try {
        const doctorId = req.user.id;
        const { startDate, endDate } = req.query;

        // Validate dates
        if (!startDate || !endDate) {
            return next({ 
                code: 400, 
                message: "Start date and end date are required" 
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate date objects
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return next({ 
                code: 400, 
                message: "Invalid date format. Use YYYY-MM-DD" 
            });
        }

        const appointments = await AppointmentTable.find({
            doctorId: doctorId,
            appointmentDate: {
                $gte: start,
                $lte: end
            }
        })
        .populate("patientId")
        .sort({ appointmentDate: 1 });

        return res.status(200).json({
            message: "Appointments retrieved successfully",
            data: appointments,
            count: appointments.length,
            dateRange: {
                start: formatDate(start, 'display'),
                end: formatDate(end, 'display')
            }
        });

    } catch (err) {
        console.error("Error in getAppointmentsByDateRange:", err);
        return next({ 
            code: err.code || 500, 
            message: err.message || "Intern