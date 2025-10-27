# Real-Time Store Inventory Fetcher

This project is a well-engineered, full-stack application that allows users to select a brand and a specific store to fetch the latest product inventory in real-time. It features a modern, responsive frontend and a robust, production-grade backend.

## ✨ Features

-   **On-Demand Fetching:** Trigger real-time inventory updates with a single click.
-   **Dynamic UI:** Sleek, responsive interface built with React, Vite, and Shadcn UI.
-   **Animated & Polished UX:** Smooth animations with Framer Motion and non-intrusive toast notifications for feedback.
-   **Robust Backend:** Built with Node.js, Express, and PostgreSQL, following production-grade best practices.
-   **Clean Architecture:** Clear separation of concerns using a layered architecture (Controllers, Services, Repositories, Adapters).
-   **Containerized:** Fully containerized with Docker for easy setup and consistent development environments.

## 🏛️ Architecture Overview

The application is composed of three main containerized services: a frontend client, a backend API, and a PostgreSQL database.

**Data Flow:**

1.  **Client Interaction:** The user selects a brand and store in the **React Frontend**.
2.  **Fetch Trigger:** The client sends a `POST /api/inventory/fetch` request to the **Backend API**.
3.  **Adapter Pattern:** The backend's **Inventory Service** selects the appropriate **Brand Adapter** (e.g., `HnMAdapter`).
4.  **Mock Fetch:** The adapter returns a store-specific list of mock inventory data.
5.  **Persistence:** The **Repository Layer** saves the new inventory snapshot to the **PostgreSQL Database** with a consistent timestamp for the entire batch.
6.  **Data Retrieval:** The client then immediately sends a `GET /api/inventory` request.
7.  **Serve Data:** The backend queries the database for the most recent snapshot for that store and returns the data.
8.  **Render View:** The frontend receives the data and renders the animated inventory table.

---

## 🚀 Quickstart (How to Run Locally)

This project is fully containerized, making the setup process straightforward.

### Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/) installed and running on your machine.
-   A terminal or command prompt.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd real-time-inventory
    ```

2.  **Set up Environment Variables:**
    You must create the environment files for the backend and frontend by copying the provided examples.

    -   **For the backend:**
        ```bash
        cp backend/.env.example backend/.env
        ```
    -   **For the frontend:**
        ```bash
        cp frontend/.env.example frontend/.env.development
        ```
    *Note: The default values in these files are already configured for the Docker setup and do not need to be changed to run the project locally.*

3.  **Build and run the containers:**
    From the root directory, run the following command. This will build the frontend and backend images and start all three services.
    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**
    -   **Frontend UI:** Open your browser and navigate to `http://localhost:5173`
    -   **Backend API:** The API is running on `http://localhost:3000`
    -   **API Docs (Swagger):** `http://localhost:3000/api-docs`

---

## 📦 API Documentation

The easiest way to test the API is with the official Postman collection. You can also view the interactive Swagger/OpenAPI documentation.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/fadehack/workspace/coupon-management/collection/31394686-3703ca4c-48be-440f-9c01-9e1e54879966?action=share&creator=31394686)

**Swagger UI:** `http://localhost:3000/api-docs`

### Endpoints

#### 1. Get All Brands

-   **Endpoint:** `GET /api/brands`
-   **Description:** Retrieves a list of all available brands to populate the UI.
-   **Sample `curl`:**
    ```bash
    curl http://localhost:3000/api/brands
    ```
-   **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        { "id": "hm", "name": "H&M" },
        { "id": "uniqlo", "name": "UNIQLO" }
      ]
    }
    ```

#### 2. Get Stores for a Brand

-   **Endpoint:** `GET /api/brands/:brandId/stores`
-   **Description:** Retrieves a list of stores for a specific brand.
-   **Sample `curl`:**
    ```bash
    curl http://localhost:3000/api/brands/hm/stores
    ```
-   **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        { "id": "store-nyc-5th-ave", "name": "New York (5th Ave)" },
        { "id": "store-stockholm-1", "name": "Stockholm (City Center)" }
      ]
    }
    ```

#### 3. Trigger Inventory Fetch

-   **Endpoint:** `POST /api/inventory/fetch`
-   **Description:** Triggers an on-demand refresh of a store's inventory.
-   **Request Body:**
    ```json
    {
      "brand": "hm",
      "storeId": "store-nyc-5th-ave"
    }
    ```
-   **Sample `curl`:**
    ```bash
    curl -X POST http://localhost:3000/api/inventory/fetch \
    -H "Content-Type: application/json" \
    -d '{"brand": "hm", "storeId": "store-nyc-5th-ave"}'
    ```
-   **Success Response (202 Accepted):**
    ```json
    {
      "success": true,
      "message": "Inventory fetch triggered for brand: hm, store: store-nyc-5th-ave."
    }
    ```

#### 4. Get Latest Inventory

-   **Endpoint:** `GET /api/inventory`
-   **Description:** Retrieves the latest available inventory snapshot for a given store.
-   **Query Parameters:**
    -   `brand` (string, required): The brand ID (e.g., `hm`).
    -   `storeId` (string, required): The store ID.
-   **Sample `curl`:**
    ```bash
    curl "http://localhost:3000/api/inventory?brand=hm&storeId=store-nyc-5th-ave"
    ```
-   **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "sku": "0987123",
          "product_name": "Relaxed Fit Hoodie",
          "size": "M",
          "color": "Black",
          "quantity": 37,
          "is_available": true,
          "last_refreshed_at": "2025-10-27T12:00:00.000Z"
        }
      ]
    }
    ```