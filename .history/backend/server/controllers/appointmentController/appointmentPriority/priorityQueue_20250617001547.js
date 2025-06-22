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
        `${i + 1}. ${a.name} - Type: ${a.visitTypePriority}, Age: ${a.age}, Arrival: ${formattedTime}`
      );
    });
  }

  return { enqueue, dequeue, printQueue };
}

function createAppointment(name, age, arrivalTime, visitTypePriority) {
  return { name, age, arrivalTime, visitTypePriority };
}

// Usage
const q = createPriorityQueue();

q.printQueue();
