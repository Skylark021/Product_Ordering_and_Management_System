# 📋 Inventory Management System

A full-stack, completely modernized web application for managing products and processing customer orders. It utilizes a **React + Vite** frontend communicating seamlessly with a **Python Flask** REST API.

---

## Features

The application is split into two dynamically routed portals:

### Admin Portal (Requires Login)
- **Authentication**: Secure login screen hiding sensitive inventory operations.
- **Inventory Overview**: View all available products in a responsive, easily readable table.
- **Add Product**: Form to add new products to the inventory database, specifying ID, Name, Price, and Quantity.
- **Remove Product**: Delete products effortlessly from the system.

### Customer Shop
- **Browse Inventory**: View all available products inside beautifully styled store cards, complete with live availability badges.
- **Place Orders**: Add items to orders by specifying Product ID and quantity. The system automatically verifies that there is enough stock before confirming and deducting the amount. 
- **My Cart (Order History)**: Instantly track all of your successfully placed orders within the live side panel.
- **Stock Tracking**: "Out of Stock" notices dynamically update across the database.

---

## Project Architecture & Tech Stack

This project was upgraded from a legacy terminal/C system into a modern Single-Page Application (SPA) utilizing:

1. **Frontend**:
    - **React**: Interactive component library.
    - **Vite**: State-of-the-art build tool pushing instant updates.
    - **React Router (v6)**: Pure client-side routing between Home, Admin, and Customer portals without page reloads.
    - **React-Bootstrap / Bootstrap**: Sleek, responsive, and mobile-first CSS architecture utilizing Cards, Navbars, Grids, and Badges.

2. **Backend**:
    - **Python 3 / Flask**: A lightweight REST Server exposing endpoints such as `/api/products` and `/api/orders`. 
    - **Static File Serving**: Flask handles serving the compiled `dist` directory from the frontend seamlessly over the same origin (`localhost:5000`), solving all CORS issues.
    - **In-Memory Config**: For simplicity, operations are routed through localized memory states (simulated DB).

---

## Installation & Setup (How to run locally)

### Prerequisites
- [Node.js](https://nodejs.org/en/) & `npm`
- [Python 3.x](https://www.python.org/downloads/) & `pip`

### Step 1: Install Python Dependencies
You will need the Flask package to host the servers. Open your terminal in the root folder:
```bash
pip install flask
```

### Step 2: Install React Dependencies & Build Frontend
Navigate into the `Frontend` directory to pull down the React packages and compile the production client.
```bash
cd Frontend
npm install
npm run build
cd ..
```
*(Note: If you run `npm run dev` in the frontend directory, the Vite proxy is already configured to point `/api` commands perfectly to Flask running on port 5000, creating an ideal development environment).*

### Step 3: Start the Backend Server
From the root folder, launch the app:
```bash
python app.py
```

### Step 4: Access the Website
Open your browser and navigate to:
**http://127.0.0.1:5000/**

*(The default mock Admin Credentials are - Username: `admin` | Password: `password`)*

---

## Repository Structure

```
Product_Ordering_and_Management_System/
│
├── app.py                      # Flask Backend REST API & Server Entry Point
├── Frontend/                   # React GUI Directory
│   ├── src/                    
│   │   ├── App.jsx             # React Components (Home, Admin, Customer)
│   │   ├── main.jsx            # React Root Rendering Config
│   │   └── index.css           # Custom CSS utilities
│   ├── dist/                   # Compiled Client-side SPA (served by Flask)
│   ├── package.json            # NPM Dependencies
│   └── vite.config.js          # Vite Bundler configurations & API proxy
└── README.md                   # System Documentation
```