This project is a basic MERN stack project for user login and registration and displaying profile upon successfull login.

Key Features implemented:
 
1. added validation for login page like user doesnot exists based on email validation and invalid password based on data stored in db.

2. added many checks in registration page for every field mainly for password with standarad format check like atleast 8 characters,one special character,one lowercase and oneuppercase character should present.

3. for every validation success message or error message are used using toast library in react.

4. used media queries for responsiveness.


Basic flow:
1. when the website is opened login screen will be displayed. If existing user login using email and password if credtinals are valid will be redirected to verify otp page.
2.  There enter the otp which is displayed in the form of toast message.if it is valid you will be redirected to account page where you can see provided information by you while registration.
3.  if you need to delete your account you can click on delete button and button text changes to deleting... once you account deleted you will be redirect to login page.
4.  when you you opened the website and you are new user you will have option there as sign up to create new account.
5.  provide all the necessary fields including image of your choice else appropriate error message will be shown in form of toast message.
6. when you clicked on create account but it turns to creating text. if all provided inputs are correct then you will be redirected to login page.
7.  so you can login using email and password which is provided by you while creating account.

Technologies used:
node and express js for backend
react js for frontend
cloudinary for storing image in cloud
mongodb atlas for database



setup instructions:
1. clone repository
2. add .env files in both client and server folders and add respective key values used in both.
3. change directory to server run command npm i to install dependencies and then run command npm run dev to start server.
4. change directory to client run command npm i to install dependencies and then run command npm run dev to start client.

thats it. now you can see project works as expected.











1. clone repository
2. add .env files in both client and server folders and add respective key values used in both.
3. change directory to server run command npm i to install dependencies and then run command npm run dev to start server.
4. change directory to client run command npm i to install dependencies and then run command npm run dev to start client.

thats it. now you can see project works as expected.
