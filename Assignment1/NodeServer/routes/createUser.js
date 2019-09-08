//Require Read & Write Module
const fs = require("fs");

// Create a new user by username, email and role
module.exports = function(app, path){
    app.post("/createUser", function(req, res){
        let newUser = {
            "username" : req.body.newUser,
            "email" : req.body.newEmail,
            "role" : req.body.newRole,
        }

        let allData = [];
        let users = [];
        
        let userUnique = true;

        if(!req.body){
            return res.sendstatus(400);
        }

        //Read JSON
        fs.readFile("./data.json", "utf-8", function(err, data){
            
            //Handle Errors
            if(err) {
                throw err;
            }
            
            allData = JSON.parse(data);
            for(let i = 0; i < allData.users.length; i++){
                if(allData.users[i].username == newUser.username){
                     userUnique  = false;
                }
            }

            if(userUnique){
                allData.users.push(newUser);
                users = allData.users;

                let allDataJson = JSON.stringify(allData);
                
                //Write JSON
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    
                    //Handle Error
                    if(err){
                        throw err;
                    }
                });
                res.send(users);
            }
            else{
                res.send("User exists");
            }
        });
    });
}