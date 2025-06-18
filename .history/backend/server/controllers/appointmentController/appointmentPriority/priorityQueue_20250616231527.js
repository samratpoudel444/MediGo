PriorityQueue.prototype.enqueue = function (appointment) {
  this.queue.push(appointment);
  this.queue.sort((a, b) => this.compare(a, b));

  if (this.queue.length > 8) {
    // Remove the lowest priority appointment (last in sorted order)
    this.queue.pop();
  }
};
function Appointment(name, age, arrivalTime, visitTypePriority) {
  this.name = name;
  this.age = age;
  this.arrivalTime = arrivalTime;
  this.visitTypePriority = visitTypePriority;
}

function PriorityQueue() {
  this.queue = [];
}

PriorityQueue.prototype.compare = function (a, b) {
  if (a.visitTypePriority !== b.visitTypePriority) {
    return a.visitTypePriority - b.visitTypePriority;
  }
  if (a.age !== b.age) {
    return b.age - a.age;
  }
  return a.arrivalTime - b.arrivalTime;
};

PriorityQueue.prototype.enqueue = function (appointment) {
  this.queue.push(appointment);
  this.queue.sort((a, b) => this.compare(a, b));

  if (this.queue.length > 8) {
    this.queue.pop();
  }
};

PriorityQueue.prototype.dequeue = function () {
  return this.queue.shift();
};

PriorityQueue.prototype.printQueue = function () {
  this.queue.forEach((a, i) => {
    console.log(
      `${i + 1}. ${a.name} - Type:${a.visitTypePriority}, Age:${a.age}`
    );
  });
};

// Example usage
const q = new PriorityQueue();

q.enqueue(new Appointment("Alice", 59, new Date("2025-06-01T10:00:00"), 2));
q.enqueue(new Appointment("Alice", 59, new Date("2025-06-01T10:00:00"), 2));
q.enqueue(new Appointment("Bob", 59, new Date("2025-06-01T09:00:00"), 1));
q.enqueue(new Appointment("Charlie", 59, new Date("2025-06-01T11:00:00"), 2));
q.enqueue(new Appointment("Diana", 30, new Date("2025-06-01T08:30:00"), 3));
q.enqueue(new Appointment("Eve", 45, new Date("2025-06-01T08:45:00"), 2));
q.enqueue(new Appointment("Frank", 50, new Date("2025-06-01T09:15:00"), 1));
q.enqueue(new Appointment("Grace", 65, new Date("2025-06-01T09:30:00"), 2));
q.enqueue(new Appointment("Heidi", 70, new Date("2025-06-01T10:30:00"), 3));
q.enqueue(new Appointment("Ivan", 40, new Date("2025-06-01T11:00:00"), 1)); // This one will push out the lowest priority appointment

q.printQueue();
