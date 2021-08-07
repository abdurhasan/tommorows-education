
RUN WITH DOCKER-COMPOSE

> docker-compose up --build --remove-orphans
or
> docker-compose up -d --build --remove-orphans


RUN WITH NPM 
> cp .env-example .env
> npm install
> npm run start:dev

Demo App : https://tomorrow-education.herokuapp.com/graphql
## Services usage : 
 - Graphql GUI is available on route /graphql
 - Postman collection : https://www.getpostman.com/collections/d963958c0b6665cb3876

- You can use this credentials

  ```
    - Admin  : 

    username : "admin"   
    password : "admin123"

    - Students : 

    username : "studentB"   
    password : "password123"
    
    username : "studentB"   
    password : "password123"
    
    - Teachers : 

    username : "teacher"   
    password : "password123"

    username : "teacher222”   
    password : "password123"
  
  ```

# Public Services ( no need authorization ) :
- login        :  getting token for auth
- register     :  Register new user , default role is student

## Authenticated and Authorized services :
  - Request Headers
  - Authorization : {{ Token }}
  # Global Services ( any user role can use ) :
  - getListUsers :  list of all users
  - currentUser  :  get user personal information based on his token

  # Admin Role :
  - updateUserRole : updating user role as he pleased ( Student , Teacher ) ,except Admin

  # Teacher Role :
  - getChallenges   :  get all challenges and it's detail
  - createChallenge :  teacher create challenge and assign a student
  - teacherReviewingChallenge

  # User Role :
  - getChallenges           :   ( only get his-assigned challenges )
  - studentSubmitAssignment :   student submit the given challenge






