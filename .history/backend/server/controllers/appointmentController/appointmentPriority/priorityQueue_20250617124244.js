export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  // Enqueue all appointments first (without setting arrivalTime)
  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.userId,
        value.Age,
        null, // placeholder for arrivalTime
        value.appointmentType,
        value.doctorId
      )
    );
  });

  // Now assign arrival times starting from 10:00
  q.assignArrivalTimes();

  return q.printQueue();
};

function createPriorityQueue() {
  const queue = [];

  function compare(a, b) {
    // Step 1: Compare visit type priority
    if (a.visitTypePriority !== b.visitTypePriority) {
      return a.visitTypePriority - b.visitTypePriority;
    }

    // Step 2: Age group priority logic
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

    if (a.arrivalTime && b.arrivalTime) {
      return new Date(a.arrivalTime) - new Date(b.arrivalTime);
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
    const baseHour = 10; 
    queue.forEach((appt, index) => {

      const arrivalDate = new Date();
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
        `${i + 1}. ${a.userId} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}, doctorId: ${a.doctorId}`
      );
    });
  }

  return { enqueue, dequeue, printQueue, assignArrivalTimes };
}

function createAppointment(
  userId,
  age,
  arrivalTime,
  visitTypePriority,
  doctorId
) {
  return {
    userId,
    age,
    arrivalTime,
    visitTypePriority,
    doctorId,
  };
}
