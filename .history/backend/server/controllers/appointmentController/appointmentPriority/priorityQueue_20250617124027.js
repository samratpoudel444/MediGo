export const priorityQueueAlgo = async (data) => {
  const q = createPriorityQueue();

  data.forEach((value, index) => {
    q.enqueue(
      createAppointment(
        value.userId,
        value.Age,
        value.timeSlot,
        value.appointmentType,
        value.doctorId
      )
    );
  });

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
      return ageGroupB - ageGroupA; // Higher group comes first
    }

    // Step 3: Arrival time (earlier is better)
    return new Date(a.arrivalTime) - new Date(b.arrivalTime);
  }

  function enqueue(appointment) {
    queue.push(appointment);
    queue.sort(compare);

    if (queue.length > 8) {
      queue.pop();
    }
  }

  function dequeue() {
    return queue.shift();
  }

  function printQueue() {
    queue.forEach((a, i) => {
      console.log(
        `${i + 1}. ${a.userId} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}, doctorId: ${a.doctorId}`
      );
    });
  }

  return { enqueue, dequeue, printQueue };
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
