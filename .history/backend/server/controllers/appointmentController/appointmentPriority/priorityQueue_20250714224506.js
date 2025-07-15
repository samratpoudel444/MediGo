export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.Age,
        null,
        value.appointmentType,
        value.appointmentDate,
        value.doctorId
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
      new: 1,
      urgent: 2,
      regular: 3,
    };

    const priorityA =
      typePriority[String(a.appointmentType).toLowerCase()] || 99;
    const priorityB =
      typePriority[String(b.appointmentType).toLowerCase()] || 99;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const agePriority = (Age) => {
      if (Age >= 70) return 3;
      if (Age <= 16) return 2;
      return 1;
    };

    const ageGroupA = agePriority(a.Age);
    const ageGroupB = agePriority(b.Age);

    if (ageGroupA !== ageGroupB) {
      return ageGroupB - ageGroupA;
    }

    if (a.arrivalTime && b.arrivalTime) {
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
      return slots.indexOf(a.arrivalTime) - slots.indexOf(b.arrivalTime);
    }

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
      appt.arrivalTime = slots[index] || slots[0];
      appt.timeSlot = appt.arrivalTime;
    });
  }

  function dequeue() {
    return queue.shift();
  }

  function printQueue() {
    queue.forEach((a, i) => {
      const dateStr = a.appointmentDate
        ? new Date(a.appointmentDate).toDateString()
        : "Invalid Date";

      // console.log(
      //   `${i + 1}. PatientID: ${a.patientId}, Type: ${a.appointmentType}, Age: ${a.Age}, ArrivalTime: ${a.arrivalTime}, TimeSlot: ${a.timeSlot}, DoctorID: ${a.doctorId}, AppointmentDate: ${dateStr}`
      // );
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
