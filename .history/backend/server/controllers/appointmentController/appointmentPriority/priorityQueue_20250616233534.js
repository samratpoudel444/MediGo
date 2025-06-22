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
      console.log(
        `${i + 1}. ${a.name} - Type:${a.visitTypePriority}, Age:${a.age}`
      );
    });
  }

  return { enqueue, dequeue, printQueue };
}

function createAppointment(name, age, arrivalTime, visitTypePriority) {
  return { name, age, arrivalTime, visitTypePriority };
}

const q = createPriorityQueue();

q.enqueue(createAppointment("Alice", 59, new Date("2025-06-01T10:00:00"), 2));
q.enqueue(createAppointment("Bob", 59, new Date("2025-06-01T09:00:00"), 1));
q.enqueue(createAppointment("Charlie", 59, new Date("2025-06-01T11:00:00"), 2));
q.enqueue(createAppointment("Diana", 30, new Date("2025-06-01T08:30:00"), 3));
q.enqueue(createAppointment("Eve", 45, new Date("2025-06-01T08:45:00"), 2));
q.enqueue(createAppointment("Frank", 50, new Date("2025-06-01T09:15:00"), 1));
q.enqueue(createAppointment("Grace", 65, new Date("2025-06-01T09:30:00"), 2));
q.enqueue(createAppointment("Heidi", 70, new Date("2025-06-01T10:30:00"), 3));
q.enqueue(createAppointment("Ivan", 40, new Date("2025-06-01T11:00:00"), 1)); 
q.enqueue(createAppointment("Ivan", 40, new Date("2025-06-01T11:00:00"), 1)); // max 8 items, will push out lowest

q.printQueue();
