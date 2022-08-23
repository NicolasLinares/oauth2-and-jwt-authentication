# Authentication with MERN stack

This project implements a login with two authentication methods, OAuth 2.0 and JSON Web Token (JWT), using a MERN stack.
  
> The user can log in with Google and GitHub, or use the credentials registered.


## Backend

The backend is in charge of registering and log in users, both by credentials or by an external provider (e.g. Google and GitHub).

* API implemented with NodeJS and ExpressJS
* Persistence layer implemented with MongoDB (optional, it's possible to test using a Database Mock).


## Frontend

* User interface implemented with ReactJS

| View | Description |
| ---- | ---- |
| Login page | Allows users to login in the system with Google, GitHub or using credentials (email and password). |
| Register page | Allows users to create an account in the system (fullname, email, password). |
| Home page | Displays users information. |




