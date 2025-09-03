# React JS Machine Test – GL Infotech

This project is a **User Management System** built with React JS, Firebase, and Tailwind CSS.  
It includes authentication, product listing, and profile management as per the given requirements.

---

## 🚀 Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS**
- **Firebase Authentication & Firestore**
- **React Router v6**
- **React Hook Form + Yup** (form validation)
- **Fake Store API** (for product listing)

---

## 📌 Features

1. **Authentication**

   - Login & Signup using Firebase Authentication
   - Form validation using React Hook Form + Yup
   - Login state persisted in Context + localStorage

2. **Product Listing**

   - Fetches products from Fake Store API
   - Responsive grid layout
   - Search by product title
   - Filter by category

3. **Profile Management**
   - Displays user details (Name, Email, Mobile, DOB)
   - Data stored in Firestore
   - Logout functionality

---

## 🔗 Links

- **GitHub Repository**: [View Code](https://github.com/AbhijithTA/GLINFOTECH_TASK.git)
- **Live Preview**: [Open App](https://glinfotech-task.vercel.app/login)

---

## ⚡ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AbhijithTA/GLINFOTECH_TASK.git
   cd GLINFOTECH_TASK
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Add a .env file in the project root with your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

```

4. Run the app:

```
Npm run dev
```


🧪 Test Credentials

Email: testuser@example.com

Password: 123456