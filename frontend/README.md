# LPG Distribution System 🚚🔥

A modern web-based system that allows users to book LPG cylinders online, track their delivery status, and manage bookings. Built with the MERN stack and designed for scalability, security, and user convenience.

---

## 📌 Project Overview

- Customers can book LPG cylinders and track their delivery status.
- Admins manage bookings, cylinder stock, delivery updates, and upload receipts/documents.

---

## 👥 User Roles & Features

### Customer
- Register/Login
- Book LPG Cylinder
- Track Booking Status
- View Order History

### Admin
- Manage All Bookings
- Update Delivery Status
- Manage Cylinder Stock
- Upload/View Receipts
- View Booking Dashboard Stats

---

## 🧱 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- React Toastify
- Chart.js or Recharts
- Formik + Yup (optional)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT or express-session
- Multer (file uploads)
- bcryptjs
- dotenv
- cors
- Postman (for API testing)

---

## 🧩 System Architecture

1. React frontend interacts with backend via Axios
2. Express.js handles business logic and API routing
3. MongoDB stores user, booking, and stock data
4. JWT/session used for role-based authentication
5. Multer handles file uploads (PDF/image receipts)
6. Admin dashboard visualizes data using charts and summaries

---

## 🧾 Core MongoDB Models

### User
```js
{
  name, email, password, role, phone, address
}

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# git update command 

git add .
git commit -m "Fix role-based registration and redirect for admin/customer"

git push origin main

---