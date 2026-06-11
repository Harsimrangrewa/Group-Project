Backend API plan

1. Overview
   Our project is a floral community system where users can explore flowers, register gardens, join events, and share flower sightings with the community.
   The backend will be built using TypeScript and Express. It will handle communication between the frontend and the MySQL database

2. We are using 4 main types of routes:

3. Get - to get data (read)
4. Post - to add new data (create)
5. Put - to upgrade existing data
6. Delete - to remove data

7. API Routes in our project

Users

Get/users - get all users
Post/users - register user
Get/users - get user details
Put/users - update user information
Delete/users - remove user

Gardens

Get /gardens - get all gardens
Post /gardens - create a garden
Get /gardens/ -get garden details
Put /gardens/ - update garden information
Delete /gardens/ - delete a garden

Flowers:

Get/flowers - get all flowers
Post/flowers - add a new flower
Get/flowers/ - get flower details
Put/flowers/ - update flower
Delete/flowers/ - delete flower

Events

Get /events- get all events
Post /events- create event
Get/events/ - get event detail
Put /events/- update event
Delete /events/ - delete event

Flower Sightings

Get/sightings - get a flower sighting
Posts/sightings - add a flower sighting
Get/sightings/ - get sighting detail
Delete/sightings/ - delete a sighting

4. Backend Structure

The backend will use a simple Express structure where routes handle API requests and controllers manage the application logic. This structure helps keep the project organized and easy to maintain.

5. How the system works:

Frontend sends request -> Backend Processes it -> Database stores or returns data

6. My Role:

My responsibility is to design the backend API structure and explain how routes connect the frontend with the database.
