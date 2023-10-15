# Scalable IoT-Enabled Smart Lighting System for Large Buildings

## Introduction

The Scalable IoT-Enabled Smart Lighting System for Large Buildings is a revolutionary project aimed at optimizing lighting management in large structures. This system offers an intelligent, adaptable, and scalable solution that reduces energy consumption and enhances user experience in large building environments.

## Application Overview

**Key Features:**

1. **Scalability**: The system seamlessly accommodates a myriad of light nodes and users within expansive structures.

2. **Security**: Robust security measures ensure data privacy, system integrity, and protect against unauthorized access.

3. **Real-time Control**: Users have instant control over their lighting environment, adapting to their needs.

4. **Energy Efficiency**: The system intelligently adjusts lighting to occupancy, reducing energy consumption.

## System Architecture

The system comprises the following components:

- **Light Nodes**: These nodes generate randomized data at initialization for individual lights and monitor room occupancy.
- **MQTT Communication**: Lightweight MQTT connectivity serves as the backbone for data exchange between light nodes and the middleware.
- **Python Middleware**: It ensures data consistency and flow between MQTT and the MongoDB Atlas database.
- **MongoDB Atlas Database**: Acts as the central repository for light node data.
- **React Frontend**: Provides user access and control over the system.
- **Express Server**: Acts as a secure intermediary between the frontend and the database.
- **Firebase Authentication**:  Firebase is used for secure user authentication, leveraging existing work or education email accounts.

The system is hosted on AWS, with auto-scaling features to ensure responsiveness and performance.

## Technologies Used

- **IoT**: IoT-enabled light nodes and MQTT communication for efficient device interaction.
- **Python**: Middleware for data synchronization.
- **MongoDB Atlas**: A scalable and secure database solution.
- **React**: Provides a user-friendly frontend.
- **Express**: Ensures real-time database communication.
- **AWS**: Hosts the system with load balancers and auto-scaling for scalability.
- **Firebase**: Handles the authentication to make sure only authorized parties are allowed to access the website

## Usage

The Scalable IoT-Enabled Smart Lighting System is designed for large buildings and offers a range of benefits:

- Efficiently manage lighting in large structures.
- Reduce energy consumption by adapting to occupancy.
- Provide users with real-time control of their lighting environment.
- Ensure data security and privacy.
- Easily scale to accommodate growing demands.

## Conclusion

This project represents a significant advancement in smart lighting systems for large buildings. By combining IoT technology, scalable architecture, and security measures, it offers a powerful solution for optimizing energy use and enhancing user experiences in modern structures.

## Demo

Although the site is no loger live due to budget restrictions, a full detailed demonstration video can be viewed [here](https://www.youtube.com/watch?v=_3pLMlNAw9k)
