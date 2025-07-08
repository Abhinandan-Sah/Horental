# Horental - Home Rental Platform 🏠

Horental is a full-stack web application for listing and booking home rentals, similar to Airbnb. Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, this platform enables users to create listings, leave reviews, and manage bookings seamlessly.

[![Horental Preview](https://github.com/user-attachments/assets/dadcbab7-a9d8-4d71-b8a8-ef7fb1c5ecf2)](https://horental.vercel.app/)

---

## 🚀 Features

- **User Authentication**: Register, login, logout with session management
- **Property Listings**: Browse, create, edit, and delete listings
- **Reviews System**: Leave and delete reviews on property listings
- **Image Upload**: Upload & manage images using **Cloudinary**
- **Authorization**: Only owners can edit/delete their listings or reviews
- **Responsive Design**: Mobile-first UI with **Bootstrap**
- **Flash Messages**: Feedback for user actions

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local Strategy)
- **Templating**: EJS with EJS-Mate layouts
- **File Upload**: Multer + Cloudinary
- **Styling**: Bootstrap CSS + custom styles
- **Sessions**: Express-session + MongoDB store

---

# Horental - Installation Guide

## Prerequisites

- Node.js (v18.17.0 or higher)
- MongoDB Atlas account
- Cloudinary account

## Clone the Repository

```bash
git clone https://github.com/Abhinandan-Sah/Horental.git
cd Horental
```

## Install Dependencies

```bash
npm install
```

## Environment Variables Setup

Create a `.env` file in the root directory and add the following variables:

```properties
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
```

### How to get these values:

1. **Cloudinary Credentials**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Go to Dashboard
   - Copy your Cloud Name, API Key, and API Secret

2. **MongoDB Atlas URL**:
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get connection string from "Connect" → "Connect your application"
   - Replace `<password>` with your database user password

3. **SECRET**:
   - Use any random string for session encryption
   - Example: `mySecretKey123`

## Initialize Database (Optional)

To populate the database with sample listings:

```bash
node init/index.js
```

## Run the Application

```bash
npm start
```

The application will be

## 📁 Project Structure

```
Horental/
├── controllers/          # Route handlers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Database schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/              # Static assets
│   ├── css/
│   └── js/
├── utils/               # Utility functions
├── init/                # Database initialization
├── middleware.js        # Custom middleware
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
└── app.js              # Main application file

markdown
Copy
Edit
```

## 🌐 API Routes

### 🔐 Authentication
- `GET /signup` – Signup form  
- `POST /signup` – Register new user  
- `GET /login` – Login form  
- `POST /login` – Authenticate user  
- `GET /logout` – Logout user  

### 🏘️ Listings
- `GET /listings` – All listings  
- `GET /listings/new` – Create listing form _(requires login)_  
- `POST /listings` – Create listing _(requires login)_  
- `GET /listings/:id` – View a listing  
- `GET /listings/:id/edit` – Edit listing _(owner only)_  
- `PUT /listings/:id` – Update listing _(owner only)_  
- `DELETE /listings/:id` – Delete listing _(owner only)_  

### 📝 Reviews
- `POST /listings/:id/reviews` – Add review _(requires login)_  
- `DELETE /listings/:id/reviews/:reviewId` – Delete review _(author only)_  

### 📦 Other
- `GET /` – Redirect to listings  
- `GET /book` – Booking page _(requires login)_  

---

## 🧰 Middleware

| Function         | Description                               |
|------------------|-------------------------------------------|
| `isLoggedIn`      | Verifies user is authenticated            |
| `isOwner`         | Checks if user is the owner of the listing |
| `isReviewAuthor`  | Checks if user is the author of a review  |
| `validateListing` | Validates listing data using Joi          |
| `validateReview`  | Validates review data using Joi           |

---

## 🧪 Installation & Setup

### ⚙️ Prerequisites
- Node.js `v18.17.0+`
- MongoDB Atlas account
- Cloudinary account

🚀 Deployment
This app is configured for Vercel using vercel.json.
To deploy on other platforms:

Ensure Node.js ≥ 18.17.0

Set all required .env variables

MongoDB Atlas must be accessible

🤝 Contributing
Fork this repo

Create a new branch git checkout -b feature-name

Commit your changes

Push and open a Pull Request

📄 License
This project is licensed under the ISC License.

## 👤 Author

**Abhinandan Sah**  
[LinkedIn](https://linkedin.com/in/abhinandan-sah) | [Instagram](https://instagram.com/avi_as)


