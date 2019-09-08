## Instructions to Run Project
Run node server.js in "NodeServer" directory
Run ng serve in "AngularServer" directory

## Version Control 
I opted to use an alternative/familar version control software (Mercurial SCM) as I was
running short on time and wasn't able to properly learn github whilst developing the chatting web app.
(I will try to include some form of git/github usage if possible)

My approach to version control consisted of updating versions after every function/major change as 
even small errors are painful if your last rollback is distant. 

## Data Structures
User:
username,email,role

Groups:
groupName, users[]

Channels:
users[], groupName, channelName

Example Below:
{"users":[{username:"",email:"",role""}],"groups":[{"groupName":"","users":[]}],"channels":[{"users":[],"groupName":"","channelName":""}]}

## Rest API

This is as close to a REST API as I could get. Each link represents a file that is linked to the server.js file.

const SERVER = "http://localhost:3000";

this.http.post<any>(SERVER + "/createUser", userObject).subscribe((data) => {
    if(data != "User exists"){
        this.users = data;
    }
    else{
        Qthis.error = data;
    }
});
    
A proper REST API would utilise  ngOnInit() {}

## Angular Architecture
Login Component 
The login component uses "authenticateUser" route to ensure the user information is valid.

Home Component
The home component uses all routes and "ngIf" to handle role permissions.


## State Changes
