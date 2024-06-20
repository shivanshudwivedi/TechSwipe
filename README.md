
# TechSwipe

TechSwipe is a modern e-commerce application that allows users to browse, search, and purchase products. The application consists of a backend built with Node.js and Firebase, and a frontend built with SwiftUI. The backend handles user authentication, product management, and cart operations, while the frontend provides a smooth and intuitive user interface.

## Table of Contents

- [TechSwipe](#techswipe)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
    - [Environment Variables](#environment-variables)
    - [Install Dependencies](#install-dependencies)
    - [Run the Backend Server](#run-the-backend-server)
  - [Frontend Setup](#frontend-setup)
    - [Install Dependencies](#install-dependencies-1)
    - [Run the Frontend Application](#run-the-frontend-application)
  - [API Documentation](#api-documentation)
    - [User Endpoints](#user-endpoints)
    - [Product Endpoints](#product-endpoints)
    - [Cart Endpoints](#cart-endpoints)
  - [Frontend Usage](#frontend-usage)
    - [Screenshots](#screenshots)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User authentication and authorization
- Product browsing and searching
- Add products to cart
- View and manage cart items
- Purchase products

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Firebase Firestore

**Frontend:**
- SwiftUI
- Firebase Authentication

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher) installed on your machine.
- Swift (v5.3 or higher) and Xcode (v12 or higher) installed on your machine.
- A Firebase project set up with Firestore and Authentication enabled.

## Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/techswipe.git
    cd techswipe/backend
    ```

2. Create a `firebaseKey.json` file in the `backend` directory and add your Firebase service account credentials. You can download the credentials from the Firebase console.

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
JWT_SECRET=your_jwt_secret
```

### Install Dependencies

Install the required dependencies:

```sh
npm install
```

### Run the Backend Server

Start the backend server:

```sh
npm start
```

The backend server will run on `http://localhost:3000`.

## Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Open the project in Xcode:

    ```sh
    open TechSwipe.xcodeproj
    ```

3. Configure Firebase in your project:
   - Download the `GoogleService-Info.plist` file from your Firebase project.
   - Add the `GoogleService-Info.plist` file to your Xcode project.

### Install Dependencies

Ensure all Swift packages are resolved and installed in Xcode.

### Run the Frontend Application

Build and run the application in Xcode.

## API Documentation

### User Endpoints

- **Register a new user**
  ```http
  POST /api/users/register
  ```
  **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St"
  }
  ```

- **Login a user**
  ```http
  POST /api/users/login
  ```
  **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Get user profile**
  ```http
  GET /api/users/profile
  ```

### Product Endpoints

- **Create a new product**
  ```http
  POST /api/products
  ```
  **Request Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 19.99,
    "category": "Category",
    "sellerId": "seller_id",
    "imageUrl": "https://example.com/image.jpg"
  }
  ```

- **Get all products**
  ```http
  GET /api/products
  ```

- **Get a product by ID**
  ```http
  GET /api/products/:id
  ```

### Cart Endpoints

- **Get all cart items**
  ```http
  GET /api/cart
  ```

- **Add an item to the cart**
  ```http
  POST /api/cart
  ```
  **Request Body:**
  ```json
  {
    "productId": "product_id",
    "quantity": 1
  }
  ```

- **Update the quantity of a cart item**
  ```http
  PUT /api/cart/:itemId
  ```
  **Request Body:**
  ```json
  {
    "quantity": 2
  }
  ```

- **Remove an item from the cart**
  ```http
  DELETE /api/cart/:itemId
  ```

- **Clear the entire cart**
  ```http
  DELETE /api/cart
  ```



## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
