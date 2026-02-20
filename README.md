# Popular Tech — Online Store

Modern e-commerce web application for browsing and purchasing consumer electronics.

## Overview

Popular Tech is a full-featured online store that allows users to browse products by categories and subcategories, view product details, manage a shopping cart, and authenticate.  
The application also includes an admin panel for managing the product catalog.

## Tech Stack

- React  
- TypeScript  
- Redux  
- Firebase (backend & persistence)

## Features

- Product catalog with categories and subcategories  
- Product details pages  
- Shopping cart with persistent state  
- User authentication and registration  
- Admin panel for managing products  
- Product filtering and sorting  
- Product ratings and recommendations  
- Responsive layout for all screen sizes  
- Global notifications for user actions  
- Loading states and spinners for async operations  
- 404 page for unknown routes  

## Data Management

- Categories, subcategories, and products are stored in Firebase  
- Cart data and sorting preferences are persisted in LocalStorage  
- During an active session, all entities are stored in Redux for fast access across the app  
- Any user action updates both in-memory state (Redux) and persistent storage (Firebase / LocalStorage)

## Admin Panel

The admin panel allows managing the product catalog:

- Create new products  
- Edit existing products  
- Manage product metadata  

Demo admin credentials:

- Email: admin@bk.ru  
- Password: Admin@2612  

## UI Details

- Header displays the current cart item count in real time  
- Header shows the currently authenticated user  
- Key user actions trigger toast notifications  
- Products with the highest ratings are highlighted as recommended across main pages  

## Routing

- Main page  
- Category page  
- Subcategory page  
- Product page  
- Cart page  
- Authentication / Registration  
- Admin panel  
- 404 page for invalid routes  

## Local Setup

1. Clone the repository  
2. Install dependencies  
3. Configure Firebase credentials  
4. Start the development server  

