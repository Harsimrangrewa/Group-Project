Florist Project- Backend API plan

1. Overview
   Our project is a florist system where users can browse flowers, place orders and join community events like workshops and decorations.

The backend is built using typescript and express. It handles all data between the frontend and database.

2. We are using 4 main types of routes:

1. Get- to get data(read)
1. Post- to add new data(create)
1. Put- to upgrade data
1. Delete- to remove dta

1. API Routes in our project

Flowers:

Get/flowers - get all flowers
Post/flowers - add a new flowwer
Put/flowers/ - update flower
Delete/flowers/ - delete flower

Orders:

Get/orders- get all orders
Post/orders- create a new order
Ger/orders/- get single order

Events

GET /events- get all events
POST /events- create event
PUT /events/- update event
DELETE /events/ - delete event

Users

Post/users- register user
Get/users - get user details

Backend Structure

The backend will use a simple Express structure where routes handle API requests and controllers manage logic. This helps keep the code organized and easy to maintain.

How System works:

Frontend sends request -> Backend Processes it -> Database stores or returns data

My Role:

My responsibility is to design the backend API structure and explain how routes connect the frontend with the database.
