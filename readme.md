# PROJECT NAME : DEV TINDER

# HLD
1. we will make 2 microservices:
    a. Frontend 
    b. Backend
2. In Frontend we are using React
3. In Backend we are using NodeJS and MongoDB

# LLD

1. Database Design:
    a. "User" collection with "firstName","lastName","emailId","password","age","Gender" as fields.
    b. "ConnectionRequest" collection with "formUserId","toUserId" and "status" as fields.
    c. "status" field can be consistes of PENDING, ACCEPTED, REJECTED, IGNORED type of values

2. API Design {REST API}:
    a. POST => /signup
    b. POST => /login
    c. GET => /profile
    d. POST => /profile