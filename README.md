# eCommerce Website

## Overview

This project is an eCommerce website built using Next.js for the frontend and Node.js for the backend. It provides a robust platform for users to browse products, manage their cart, and complete purchases. The site includes features such as user authentication, product management, and order processing.

## Features

- **Product Catalog**: Browse and search for products.
- **Shopping Cart**: Add and remove items from the cart.
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Order Management**: Place orders, view order history, and manage shipping information.
- **Promo Codes**: Apply promo codes for discounts.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Integration**: (e.g., Stripe, PayPal) - if applicable

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB server running (local or remote)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   
2. **Navigate to the Project Directory**
   ```bash
   cd frontend
   cd node_backend
   
3. **Install Dependencies**
   ```bash
   npm install
   
4. **Set Up Environment Variables**
   Create a .env file in the root of your project and add the following environment variables:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   secretkey=your_jwt_secret_key
   
  Adjust the variables based on your environment and configuration.

6. **Run the Application**
   
   **Start Frontend**
   ```bash
   npm run dev

  **Start Backend**
   ```bash
    node server.js
    Or
    nodemon
  ```
## Usage

### User Registration and Authentication

- **Sign Up**: Navigate to the registration page and create an account.
- **Log In**: Use the login page to authenticate and access user-specific features.

### Managing Products

- **Browse Products**: View the product catalog and filter items.
- **Add to Cart**: Add items to your cart for purchase.

### Placing Orders

- **Checkout**: Review cart items, enter shipping information, and place an order.
- **View Orders**: Access your order history and details.

### Applying Promo Codes

- **Enter Promo Code**: Apply promo codes during checkout to receive discounts.

   
