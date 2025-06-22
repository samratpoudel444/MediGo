export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.patientAge, // consistent with Mongoose schema: patientAge
        null, // placeholder arrivalTime
        value.appointmentType, // appointmentType string
        value.appointmentDate,
        value.doctorId
      )
    );
  });

  q.assignArrivalTimes();

  // Return the actual queue data (array of appointment objects)
  const queue = q.getQueue();
  return queue;
};

function createPriorityQueue() {
  const queue = [];

  // Compare function to sort appointments by priority rules
  function compare(a, b) {
    // 1️⃣ Appointment type priority (you can define your own priority order here)
    // Example: map appointmentType to numeric priority (lower is higher priority)
    const typePriority = {
      emergency: 1,
      urgent: 2,
      regular: 3,
    };

    const priorityA = typePriority[a.appointmentType] || 99;
    const priorityB = typePriority[b.appointmentType] || 99;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 2️⃣ Age group priority (elderly > children > others)
    const agePriority = (age) => {
      if (age >= 70) return 3;
      if (age <= 16) return 2;
      return 1;
    };

    const ageGroupA = agePriority(a.patientAge);
    const ageGroupB = agePriority(b.patientAge);

    if (ageGroupA !== ageGroupB) {
      return ageGroupB - ageGroupA;
    }

    // 3️⃣ Arrival time (earlier is better)
    if (a.arrivalTime && b.arrivalTime) {
      return new Date(a.arrivalTime) - new Date(b.arrivalTime);
    }

    return 0;
  }

  function enqueue(appointment) {
    queue.push(appointment);
    queue.sort(compare);

    // Limit queue size to top 8
    if (queue.length > 8) {
      queue.pop();
    }
  }

  function assignArrivalTimes() {
    const baseHour = 9; // Starting at 9 AM
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
      const arrivalDate = new Date();
      arrivalDate.setHours(baseHour + index, 0, 0, 0);
      appt.arrivalTime = arrivalDate;

      // Assign timeSlot string to match enum values expected by Mongoose schema
      appt.timeSlot = slots[index] || slots[0];
    });
  }

  function dequeue() {
    return queue.shift();
  }

  function printQueue() {
    queue.forEach((a, i) => {
      const formattedTime = a.arrivalTime
        ? new Date(a.arrivalTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A";

      console.log(
        `${i + 1}. PatientID: ${a.patientId}, Type: ${a.appointmentType}, Age: ${a.patientAge}, Arrival: ${formattedTime}, TimeSlot: ${a.timeSlot}, DoctorID: ${a.doctorId}, Date: ${a.appointmentDate}`
      );
    });
  }

  function getQueue() {
    return queue;
  }

  return {
    enqueue,
    dequeue,
    assignArrivalTimes,
    printQueue,
    getQueue,
  };
}

function createAppointment(
  patientId,
  patientAge,
  arrivalTime,
  appointmentType,
  appointmentDate,
  doctorId
) {
  return {
    patientId,
    patientAge,
    arrivalTime,
    appointmentType,
    appointmentDate,
    doctorId,
    timeSlot: null, // will be assigned later
  };
}
