# Guilds, Rentals, Destination - Motorcycle Community Platform

This project is a web platform for motorcycle enthusiasts, providing features for joining motorcycle guilds, renting bikes, and planning trips.

## Features

*   **User Authentication:** Users can register and log in to the platform.
*   **Motorcycle Guilds:** Users can view and join different motorcycle guilds. The platform keeps track of guild members.
*   **Bike Rentals:** Users can browse a selection of motorcycles for rent.
*   **Trip Planning:** (Static page) Information about motorcycle trips.
*   **FAQ:** (Static page) Frequently asked questions.

## Tech Stack

*   **Frontend:** HTML, CSS, JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Libraries:**
    *   `mongoose`: For object data modeling with MongoDB.
    *   `body-parser`: For parsing request bodies.
    *   `cors`: For enabling Cross-Origin Resource Sharing.
    *   `leaflet`: For interactive maps (dependency included but not fully implemented).
    *   `pdfkit`: For generating PDFs (dependency included but not fully implemented).

## Project Structure

This project is composed of a frontend and three separate backend services. Each backend service runs on its own port and has its own database.

*   **Frontend:** The `MRD_final.html` file is the main entry point for the application. Other HTML files like `guilds.html`, `Rentals.html`, and `BikeX.html` build out the user interface.

*   **Authentication Service (`LoginRegister.js`):**
    *   Runs on port `5000`.
    *   Handles user registration and login.
    *   Connects to the `yourDatabaseName` MongoDB database.

*   **Guilds Service (`server.js`):**
    *   Runs on port `8000`.
    *   Handles guild management (adding and retrieving members).
    *   Connects to the `guilds` MongoDB database.

*   **Rentals Service (`app_rentals.js`):**
    *   Runs on port `3000`.
    *   Provides an API for managing bike rentals (fetching bikes, checking quantity, and updating quantity).
    *   Connects to the `projectdb` MongoDB database.
    *   **Note:** The frontend for rentals is currently static and does not communicate with this service.

## Getting Started

### Prerequisites

*   Node.js and npm installed.
*   MongoDB installed and running.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application, you need to start all three backend servers simultaneously in separate terminal windows.

1.  **Start the Authentication Service:**
    ```bash
    node LoginRegister.js
    ```
    This server will run on `http://localhost:5000`.

2.  **Start the Guilds Service:**
    ```bash
    npm start
    ```
    or
    ```bash
    node server.js
    ```
    This server will run on `http://localhost:8000`.

3.  **Start the Rentals Service:**
    ```bash
    node app_rentals.js
    ```
    This server will run on `http://localhost:3000`.

4.  **Access the application:**
    Open the `MRD_final.html` file in your web browser to start using the application.

## Future Improvements

*   **Consolidate Backends:** The three separate backend servers should be merged into a single, unified server to simplify the architecture and improve maintainability.
*   **Integrate Rentals Backend:** The static rentals frontend should be connected to the rentals backend to enable dynamic rental functionality (e.g., checking availability, making reservations).
*   **Implement Trips and FAQ:** The Trips and FAQ pages are currently static. They could be made dynamic by adding backend support.
*   **Improve UI/UX:** The user interface could be improved for a more modern and user-friendly experience. Consider using a frontend framework like React or Vue.js.
