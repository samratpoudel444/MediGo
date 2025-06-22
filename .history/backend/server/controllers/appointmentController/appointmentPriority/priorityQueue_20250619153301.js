export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.patientAge, 
        null, 
        value.appointmentType,
        value.appointmentDate, 
        value.doctorId
      )
    );
  });

  q.assignArrivalTimes();

  const queue = q.getQueue();
  console.log(queue)
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
      console.log(
        `${i + 1}. PatientID: ${a.patientId}, Type: ${a.appointmentType}, Age: ${a.patientAge}, ArrivalTime: ${a.arrivalTime}, TimeSlot: ${a.timeSlot}, DoctorID: ${a.doctorId}, AppointmentDate: ${a.appointmentDate.toDateString()}`
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
    timeSlot: null, 
  };
}
