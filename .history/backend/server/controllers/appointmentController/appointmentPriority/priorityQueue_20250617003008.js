export const priorityQueueAlgo= async(data)=>
{
const q = createPriorityQueue();

data.forEach((value, index)=>
{
q.enqueue(
  createAppointment(value.userId, value.Age, value.timeSlot,value.appointmentType, value.doctorId)
);
})



function createPriorityQueue() {
  const queue = [];

  function compare(a, b) {
    if (a.visitTypePriority !== b.visitTypePriority) {
      return a.visitTypePriority - b.visitTypePriority;
    }
    if (a.age !== b.age) {
      return b.age - a.age;
    }
    return a.arrivalTime - b.arrivalTime;
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
      const formattedTime = a.arrivalTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(
        `${i + 1}. ${a.userId} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}, doctorId:${a.doctorId}`
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
  return { userId, age, arrivalTime, visitTypePriority, doctorId };
}

// Usage

