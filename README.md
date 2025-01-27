#google drive 
upload pdf all files 

Table of Contents
Introduction
Features
Installation
Usage
Routes
Technologies Used
Contributing
License

##Features
#User authentication (registration and login)
File upload and download
Secure file storage using Firebase
User-specific file management
Installation
Clone the repository:
git clone https://github.com/yourusername/yourproject.git
Navigate to the project directory:
cd yourproject
Install dependencies:
npm install
Set up environment variables:
Create a .env file in the root directory.



Add the following environment variables:

#JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
Usage
Start the server:
npm start
Open your browser and navigate to http://localhost:3000.
Routes
Authentication
POST /register: Register a new user.
POST /login: Log in an existing user.
File Management
GET /home: Display the home page with user-specific files.
POST /upload-file: Upload a new file.
GET /download/:filename: Download a file.
Technologies Used
Node.js
Express.js
MongoDB
Mongoose
Firebase Admin SDK
Multer
JWT (JSON Web Token)
EJS (Embedded JavaScript templates)
Tailwind CSS
Contributing
Fork the repository.
Create a new branch:
git checkout -b feature/your-feature
Make your changes.
Commit your changes:
git commit -m 'Add some feature'
Push to the branch:
git push origin feature/your-feature
Open a pull request.
License
This project is licensed under the MIT License.

Feel free to customize this template according to your project's specific details and requirements.
