# Doctor Appointment Booking System

A full-stack MERN application for managing doctor appointments and medical consultations.
![preview](https://github.com/user-attachments/assets/f7a1195f-4ddd-455a-b1ef-d7ab79983672)


## Features

### For Patients

- User registration and authentication
- Search and filter doctors by specialization
- Book appointments with preferred time slots
- View appointment history
- Manage profile and medical records

### For Doctors

- Professional profile management
- Set availability and time slots
- View and manage appointments
- Access patient medical history
- Update appointment status

### For Admin

- User management (doctors/patients)
- Verify doctor profiles
- Monitor appointments

## Tech Stack

### Frontend

- React.js
- Redux for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js & Express.js
- MongoDB for database
- JWT for authentication
- Bcrypt for password hashing

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd doctor-appointment
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
   Create `.env` file in backend directory:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the application

```bash
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm start
```

## API Endpoints

### User Routes

- POST /api/user/register - Register new patient
- POST /api/user/login - User login
- POST /api/user/book-appointment - Book new appointment
- GET /api/user/list-appointment - Get user's appointments
- GET /api/user/profile - Get user profile
- POST /api/user/edit/profile - Update user profile
- POST /api/user/cancel-appointment - Cancel an appointment

### Doctor Routes

- GET /api/doctor/list - Get list of all doctors
- POST /api/doctor/login - Doctor login
- POST /api/doctor/appointments - Get doctor's appointments

### Admin Routes

- POST /api/admin/login - Admin login
- POST /api/admin/add-doctor - Add new doctor (with image upload)
- POST /api/admin/all-doctors - Get all doctors list
- GET /api/admin/all/appointments - Get all appointments
- POST /api/admin/change-availability - Update doctor availability

## Environment Variables

```
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ORIGIN=your_frontend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


