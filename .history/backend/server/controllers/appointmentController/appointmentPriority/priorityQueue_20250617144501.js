export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.age, // consistent casing
        null, // Placeholder for arrival time
        value.appointmentType,
        value.appointmentDate,
        value.doctorId
      )
    );
  });

  q.assignArrivalTimes();

  // Return the actual queue data (array of objects)
  const queue = q.getQueue();
  return queue;
};

function createPriorityQueue() {
  const queue = [];

  function compare(a, b) {
    // 1️⃣ Visit type priority (lower is better)
    if (a.visitTypePriority !== b.visitTypePriority) {
      return a.visitTypePriority - b.visitTypePriority;
    }

    // 2️⃣ Age group priority (elderly > children > others)
    const agePriority = (age) => {
      if (age >= 70) return 3; // Highest priority
      if (age <= 16) return 2; // Medium priority
      return 1; // Lowest priority
    };

    const ageGroupA = agePriority(a.age);
    const ageGroupB = agePriority(b.age);

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

    // Limit to top 8 patients
    if (queue.length > 8) {
      queue.pop();
    }
  }

  function assignArrivalTimes() {
    const baseHour = 10; // Start at 10:00 AM
    queue.forEach((appt, index) => {
      arrivalDate.setHours(baseHour + index, 0, 0, 0);
      appt.arrivalTime = arrivalDate;
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
        `${i + 1}. ${a.patientId} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}, doctorId: ${a.doctorId}, date: ${a.appointmentDate}`
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
    getQueue, // <-- added getter method
  };
}

function createAppointment(
  patientId,
  age,
  arrivalTime,
  visitTypePriority,
  appointmentDate,
  doctorId
) {
  return {
    patientId,
    age,
    arrivalTime,
    visitTypePriority,
    appointmentDate,
    doctorId,
  };
}
