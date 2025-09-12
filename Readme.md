
# Smart Medical Prescription And Consultation System(MediGo)

# Overview

The smart prescription management and consultation system(MediGo) is an integrated healthcare platform designed to streamline the process of prescription handling and medicine accessibility for patients. The system allows users to book appointments with doctors, upload prescription images, and automatically extract medicine details using Optical Character Recognition (OCR) technology. Once the prescription is processed, The smart medical assistance system(MediGo) provides users with comprehensive information about the prescribed medicines, including usage, and side effects. The system further enhances convenience by suggesting nearby pharmacies and providing the shortest navigation route using Maps API. 

# Features 

**Doctor Appointment Booking**: Patients can view available doctors and book appointments directly through the platform.

**Real-time appointment scheduling**: User can make the appointment booking through system.

**Prescription Scanning & OCR Extraction**: Upload prescription images and automatically extract medicine details using Optical Character Recognition (OCR) which 
reduces manual entry errors and speeds up prescription processing.

**Prescription Information Storage**: Store all prescription data securely in the patient’s history and access past prescriptions, dosages, and treatment notes anytime.

**Doctor-Patient Chat**: Patients can communicate directly with their doctors for consultation and follow-ups.
The chat feature allows sharing of messages, and prescription details securely.

**Nearby Pharmacy Navigation**: The system suggests nearby pharmacies based on the user’s location. It provides the shortest route and directions using Maps API for easy access to medicines.


# Tools and Technology Used

**React.js**: For scalable user Interface of system. 

**Node.js**: Backend framework for building the system.

**Express.js**: Web server framework.

**MySQL**: Database for storing whole system data.

**Nodemailer**: Used to send emails for medications reminders and appointment remainder.

**Cron Jobs**: For scheduling appointement priority and medications reminders.

**Redis**: Redis is used for caching frequently accessed data to improve system performance.
It helps in managing real-time data like notifications, sessions, and quick lookups efficiently.

**Jest**: Jest is used for unit and integration testing of the backend and frontend components.
It ensures code reliability by automatically running tests and validating expected outputs.

# GETTING STARTED WITH PROJECT SETUP

**1. Clone this repository**

    git clone https://github.com/samratpoudel444/MediGo.git

**2. Install project Frontend with npm**

```bash
  cd frontend 
  npm install
```

**3. Install project Backend with npm**

```bash
  cd backend 
  npm install
```
**4. Scripts for migrating medicine in database with npm**

```bash
    npm run migrateMedicine
```

**5. Scripts for migrating medicine in database with npm**

```bash
    npm run seedAdmin
```


**6. Scripts for starting Frontend**

```bash
    cd frontend
    npm run dev
```

**6. Scripts for starting Frontend**

```bash
      cd backend
    npm run dev
```






