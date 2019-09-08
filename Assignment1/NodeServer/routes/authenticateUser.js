//Require Read & Write Module
const fs = require("fs");

// Authenticate User
module.exports = function(app, path){
    app.post("/authenticateUser", function(req, res){
        
        let users = [];
        
        let username = req.body.username;
        
        let userAuthenticated = false;

        if(!req.body){
            return res.sendstatus(400);
        }

        // Read file
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }

            let allData = JSON.parse(data);
            users = allData.users;
            
            for(let i = 0; i < users.length; i++){
                if(username == users[i].username){
                    userAuthenticated = true
                }
            }
            res.send(userAuthenticated);
        });
    });
}