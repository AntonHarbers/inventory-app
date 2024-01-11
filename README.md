# Inventory Express App - The Odin Project

## Introduction

Welcome to the Inventory Express App, a comprehensive inventory management system developed as part of the Odin Project curriculum. This application, built using Node.js and Express, is perfect for anyone looking to implement a straightforward and efficient system for tracking items and categories in their inventory.

[Live Link]()

## Project Origin

This application was developed as a portfolio project for the Odin Project's curriculum, an open-source project designed to provide a comprehensive education in web development.

## Key Features

- **Inventory Management:** Efficiently add, update, and delete items and categories.
- **Data Categorization:** Organize items under customizable categories for better management.
- **User-Friendly Interface:** A responsive web interface ensures easy navigation and inventory handling.

## Key Concepts

- **MVC Architecture:** Adopts the Model-View-Controller pattern for clarity and maintenance ease.
- **Data Validation:** Implements thorough validation to ensure the integrity of the data.
- **Environment Variables:** Utilizes environment variables for secure configuration management.

## Folder Structure

- `controllers/`: Logic and controller files.
- `models/`: Mongoose models with database schemas.
- `routes/`: URL pattern definitions.
- `views/`: Pug templates for the user interface.
- `public/`: Static assets like stylesheets and scripts.
- `bin/`: Contains the entry point for server initialization.
- `helpers/`: Utilities and middleware for shared functionality.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

```bash
git clone https://github.com/AntonHarbers/inventory-app.git
cd inventory-app
npm install
```

### Configuration

- Rename `.env.example` to `.env`.
- Populate the `.env` file with your MongoDB URI and desired settings.

### Running the Application

```bash
npm start
# Access the app at http://localhost:3000
```

## Usage

Navigate to `http://localhost:3000` for inventory management tasks like adding, updating, and listing items and categories.

## Contribution Policy

While this project is a part of my portfolio and closed for direct contributions, you are more than welcome to fork the repository and continue developing it on your own. This project can serve as a great starting point or reference for your own work.

## Final Notes

As a learning endeavor within the Odin Project's curriculum, this application emphasizes practical application of web development principles. It serves as a showcase of my journey and skills in full-stack development.
