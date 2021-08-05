
RUN WITH DOCKER-COMPOSE

> docker-compose up 
or
> docker-compose up -d


RUN WITH NPM 
> cp .env-example .env
> npm install
> npm run start:dev

## Services usage : 

- You can use this credentials

  ```
    - Admin  : 

    username : "admin"   
    password : "admin"

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

##  Services Based on Role

# Global ( any user role can use ) :
- getListUsers : list of all users
- login        :  getting token for auth
- register     :  Register new user , default role is student
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






