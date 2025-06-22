function Appointment(name, age, arrivalTime, visitTypePriority) {
  this.name = name;
  this.age = age;
  this.arrivalTime = arrivalTime; // Date object
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
};

PriorityQueue.prototype.dequeue = function () {
  return this.queue.shift();
};

PriorityQueue.prototype.printQueue = function () {
  this.queue.forEach((a, i) => {
    console.log(`${i + 1}. ${a.name} - Type:${a.visitTypePriority}, Age:${a.age}`);
  });
};

// // Usage
// const q = new PriorityQueue();

// q.enqueue(new Appointment("Alice", 59, new Date("2025-06-01T10:00:00"), 2));
// q.enqueue(new Appointment("Bob", 59, new Date("2025-06-01T09:00:00"), 1));
// q.enqueue(new Appointment("Charlie", 59, new Date("2025-06-01T11:00:00"), 2));
// q.enqueue(new Appointment("Diana", 30, new Date("2025-06-01T08:30:00"), 3));

// q.printQueue();
