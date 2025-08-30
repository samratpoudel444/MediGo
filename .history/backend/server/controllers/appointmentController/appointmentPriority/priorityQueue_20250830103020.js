export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.Age,
        null, // arrivalTime will be assigned later
        value.appointmentType,
        value.appointmentDate,
        value.doctorId
      )
    );
  });

  q.assignArrivalTimes(); // Assign based on sorted priority
  return q.getQueue(); // Return queue with assigned time slots
};

// 👇 Queue Factory Function
function createPriorityQueue() {
  const queue = [];

  // Priority: Lower number = Higher priority
  function compare(a, b) {
    const typePriority = {
      new: 1,
      urgent: 2,
      regular: 3,
    };

    const priorityA =
      typePriority[String(a.appointmentType).toLowerCase()] || 99;
    const priorityB =
      typePriority[String(b.appointmentType).toLowerCase()] || 99;

    if (priorityA !== priorityB) return priorityA - priorityB;

    // Age Priority: 70+ (3), <=16 (2), others (1)
    const agePriority = (age) => (age >= 70 ? 3 : age <= 16 ? 2 : 1);
    const ageA = agePriority(a.Age);
    const ageB = agePriority(b.Age);

    if (ageA !== ageB) return ageB - ageA; // higher group comes first


    return new Date(a.appointmentDate) - new Date(b.appointmentDate);
  }

  function enqueue(appointment) {
    queue.push(appointment);
    queue.sort(compare);

    if (queue.length > 8) {
      queue.pop(); // Only first 8 get time slots
    }
  }

  function assignArrivalTimes() {
    const slots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ];

    queue.forEach((appt, index) => {
      appt.arrivalTime = slots[index] || null;
      appt.timeSlot = appt.arrivalTime;
    });
  }

  return {
    enqueue,
    assignArrivalTimes,
    getQueue: () => queue,
  };
}

// 👇 Appointment Constructor
function createAppointment(
  patientId,
  Age,
  arrivalTime,
  appointmentType,
  appointmentDate,
  doctorId
) {
  return {
    patientId,
    Age,
    arrivalTime,
    appointmentType,
    appointmentDate,
    doctorId,
    timeSlot: null,
  };
}
