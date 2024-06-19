# Meeting Room Booking System

This project implements a web application for managing room reservations in a co-working space environment. The application allows administrators to create, update, and delete rooms, define available time slots, and manage booking details. Users can view room availability, select time slots, and make bookings based on their requirements.

The backend of the application is built using TypeScript with Express.js as the web framework and Mongoose for MongoDB object modeling. This README provides an overview of the project structure, installation instructions, and basic usage.

## Features

- #### Admin Panel:

  - Create, update and delete rooms.
  - Define available time slots for each room.
  - Manage room details such as name, number, capacity, amenities, and pricing.
  - Update user bookings.

- #### User Booking:

  - View available rooms and time slots.
  - Select desired time slots for booking.
  - Calculate booking cost based on selected slots and room pricing.
  - Real-time feedback on room and slot availability.

- #### Validation and Error Handling:

  - Robust validation to prevent conflicts in bookings.
  - Informative error messages for users to guide them through the booking process.

## Technology Stack

- **Language:** TypeScript
- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose for ODM
- **Validation:** Using zod validation, built-in validation features of Mongoose and custom validation logic in TypeScript.

## Prerequisites

- Node.js (>=18.x)
- npm
- MongoDB (local installation or connection to a MongoDB instance)

## Getting Started

To run the application locally, follow these steps:

#### 1. Clone this repository to your local machine:

```
git clone https://github.com/showkatali-dev/Meeting-Room-Booking-System

```

#### 2. Navigate to the project directory:

```
cd Meeting-Room-Booking-System
```

#### 3. Install dependencies:

```
npm install
```

#### 4. Set up environment variables:

Create a `.env` file in the root directory of the project and define the following variables:

```
PORT=4000
MONGO_URI="mongodb://127.0.0.1:27017/meeting-room-booking-system?replicaSet=rs0"
BCRYPT_SALT_ROUND=12
JWT_SECRET="your_jwt_secret"
JWT_EXPIRE_IN="7d"
NODE_ENVIRONMENT="development"
```

Replace `your-mongodb-uri` with the connection URI for your MongoDB database.

#### 5. Start the server:

```
npm run dev
```

The server will start running on port 4000. You can change the port in the `.env` file if needed.

#### 6. Access the API endpoints:

You can now access the API endpoints locally using tools like cURL, Postman, or by making HTTP requests from your frontend application.

## API Documentation

### User Routes

1. **User Sign Up**

- _*Route:*_ `/api/auth/signup` (POST)
- **Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

**2\. User Login**

- _*Route:*_ `/api/auth/login` (POST)
- **Request Body:**

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

###

### Room Routes

**3\. Create Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms` (POST)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- _*Request Body:*_

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**4\. Get a Room**

- _*Route:*_ `/api/rooms/:id` (GET)
- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**5\. Get All Rooms**

- _*Route:*_ `/api/rooms` (GET)
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Rooms retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Meeting Room",
      "roomNo": 301,
      "floorNo": 2,
      "capacity": 10,
      "pricePerSlot": 200,
      "amenities": ["Whiteboard"],
      "isDeleted": false
    }
    // Other available rooms
  ]
}
```

**6\. Update Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (PUT)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- **Request Body:**

```json
{
  "pricePerSlot": 200 //we can update any field dynamically, (e.g., name, roomNo, floorNo, capacity, pricePerSlot, amenities)..
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**7\. Delete a Room (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (DELETE)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": true
  }
}
```

###

### Slot Routes

8\. **Create Slot (Only Accessible by Admin)**

- _*Route:*_ `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Request Body:**

```json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00",
      "isBooked": false
    }
  ]
}
```

**9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

- `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
- `roomId`: ID of the room for which available slots are requested.

> Special Remarks

If we hit `/api/slots/availability` without any query params then we will get all the slots that are not booked ( isBooked: false)

**Request endpoint example**

`/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

or

`/api/slots/availability`

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    }
  ]
}
```

###

### Booking Routes

**10\. Create a Booking (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/bookings` (POST)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```

**11\. Get All Bookings (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings` (GET)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "address": "123 Main St, Anytown, USA",
        "role": "user"
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
    // other bookings ( If any )
  ]
}
```

**12\. Get User's Bookings (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/my-bookings`(**GET**)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

**13\. Update Booking (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (PUT)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

- **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```

**14\. Delete Booking (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (DELETE)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": true
  }
}
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any suggested enhancements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to [Programming Hero](https://web.programming-hero.com/) for providing the project requirements and inspiration.
