# Smart Library Management System with Voice Assistant

## Overview
The Smart Library Management System is a web-based application designed to simplify digital library access. It allows students to upload, search, preview, and download books while administrators manage the library content.

This system also integrates a voice assistant to enable users to search, open, and download books using voice commands.






## Project Structure

---







## 🚀Features

- User authentication using Firebase
- Upload and store books in cloud storage
- Rule-based access: users must upload 3 books before downloading
- Smart search functionality
- PDF preview viewer
- Voice assistant for book search and navigation
- Admin dashboard for managing books
- Book category filtering
- Responsive and modern UI
---

## System Workflow

-  User registers or logs in.
- Users upload books to the system.
- After uploading 3 books, users gain download access.
- Users can search or preview books.
- Voice assistant allows commands like:
   - "Search machine learning"
   - "Open AI notes"
   - "Download operating systems book"

## 📂 Project Structure

library-system/

│

├── frontend

│ ├── index.html

│ ├── library.html

│ ├── upload.html

│ ├── admin.html

│ ├── app.js

│ └── style.css

│

├── backend

│ ├── server.js

│ └── library.json

│

└── storage

└── libraryStorage/

## 🛠 Tech Stack


Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express.js

Database / Storage:
- Local JSON database
- Google Drive storage (via synced folder)

Libraries / APIs:
- Fuse.js (search engine)
- Web Speech API (voice assistant)
- PDF.js (PDF viewer)


## ▶️ How to Run the Project

- Install Node.js
- Install dependencies


npm install express multer cors archiver


-Start the backend server


node server.js


- Open frontend with Live Server


http://localhost:5000


## Voice Assistant Commands

Example commands supported:

- "Search machine learning"
- "Show AI books"
- "Open data structures notes"
- "Download operating systems"
- "How many books are in the library?"

## Future Enhancements

- AI-based book recommendation system
- Book rating and review system
- Mobile application version
- OCR-based search inside PDFs
- Advanced analytics dashboard
## 📸 Screenshot
### 
![1](https://github.com/user-attachments/assets/6708021b-695a-4828-9df3-a59238bec3c0)


![2](https://github.com/user-attachments/assets/8a100e28-d091-4848-ae85-925ff984584b)




## Demo
https://github.com/user-attachments/assets/a580e21f-b8f1-4503-9c39-be6563ecc19d


## developed by

Name: Karthik S
## 📄 License
This project is intended for educational and academic purposes only.

