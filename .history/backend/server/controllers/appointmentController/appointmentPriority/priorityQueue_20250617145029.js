export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.patientAge, // keep age
        null, // arrivalTime not needed or can be null
        value.appointmentType, // appointmentType string
        value.doctorId // no appointmentDate anymore
      )
    );
  });

  q.assignArrivalTimes();

  const queue = q.getQueue();
  return queue;
};

function createPriorityQueue() {
  const queue = [];

  function compare(a, b) {
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

    // Ignore arrivalTime sorting or keep if needed, here removing it:
    return 0;
  }

  function enqueue(appointment) {
    queue.push(appointment);
    queue.sort(compare);

    if (queue.length > 8) {
      queue.pop();
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
      // Instead of full date, just assign timeSlot string
      appt.timeSlot = slots[index] || slots[0];

      // Optional: If you want arrivalTime as Date but with a fixed date (like today), you can create it but only time matters.
      // Or just keep arrivalTime null or remove it if not needed.
      appt.arrivalTime = null; // or remove this property
    });
  }

  function dequeue() {
    return queue.shift();
  }

  function printQueue() {
    queue.forEach((a, i) => {
      console.log(
        `${i + 1}. PatientID: ${a.patientId}, Type: ${a.appointmentType}, Age: ${a.patientAge}, TimeSlot: ${a.timeSlot}, DoctorID: ${a.doctorId}`
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
  arrivalTime, // can be null or removed
  appointmentType,
  doctorId
) {
  return {
    patientId,
    patientAge,
    arrivalTime, // can be null
    appointmentType,
    doctorId,
    timeSlot: null,
  };
}
