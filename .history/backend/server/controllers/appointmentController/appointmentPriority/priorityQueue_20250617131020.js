import bookAppointmentTable from "../../../db/models/bookedAppointment.js";


export const priorityQueueAlgo = async (data) => {
  console.log(data);
  const q = createPriorityQueue();


  data.forEach((value) => {
    q.enqueue(
      createAppointment(
        value.patientId,
        value.Age,
        null, // placeholder for arrivalTime
        value.appointmentType,
        value.doctorId
      )
    );
  });

  q.assignArrivalTimes();

  const queue= q.printQueue();
  return queue;
};

function createPriorityQueue() {
  const queue = [];

  function compare(a, b) {
    if (a.visitTypePriority !== b.visitTypePriority) {
      return a.visitTypePriority - b.visitTypePriority;
    }


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
        `${i + 1}. ${a.patientId} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}, doctorId: ${a.doctorId}`
      );
    });
  }

  return { enqueue, dequeue, printQueue, assignArrivalTimes };
}

function createAppointment(
  patientId,
  age,
  arrivalTime,
  visitTypePriority,
  doctorId
) {
  return {
    patientId,
    age,
    arrivalTime,
    visitTypePriority,
    doctorId,
  };
}
