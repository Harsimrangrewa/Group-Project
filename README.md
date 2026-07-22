# PROG3271-Florist-Business

# Group Members: (Group 3)

1. Harsimrandeep Kaur
2. Gurleen Kaur
3. Casim Bahadar

# Project Description:

The Florist Business a website/applcition where perople can browse flower collection and order bouquets online, customize arrangements.

The system focuses on:

1. Easy Flower browsing
2. Online ordering
3. Secure Checkout

Routes Usable:
"localhost3000/browse"
"localhost3000/order" for GET, PUT requests
"localhost3000/checkout" for GET request

# Basic frontend idea

1. Header (Logo,website name)
2. Nav (Home, Shop, About, Contact)
3. Section(Section with flower image)
4. Image (tags for flower bouquet images)
5. Button (Shop now or Add to Cart)
6. Section (Best Sellers)
7. Section (customer reviews)
8. Form (Contact form with name, email)
9. Footer (contact info or social media link)
10. Mutiple pages

# Roles/Tasks breakdown

1. Casim Bahadar - Jira Part
2. Harsimrandeep Kaur - GitHub Part
3. Gurleen Kaur - Environment Part

---

# Milestone 3 – Backend Setup (TypeScript + Express + MySQL)

## How to Run

1. Install dependencies:
   npm install

2. Import the SQL file into MySQL:
   USE garden_with_us;

3. Update MySQL credentials in src/db.ts:
   user: "root"
   password: "YOUR_PASSWORD"
   database: "garden_with_us"

4. Start the server:
   npm run dev

Server runs at: http://localhost:3001

---

## API Endpoints

GET /users  
GET /gardens  
GET /flowers  
GET /events

---

## Files Included

- src/index.ts
- src/db.ts
- src/routes/
- garden_with_us.sql
- package.json
- tsconfig.json
- README.md
