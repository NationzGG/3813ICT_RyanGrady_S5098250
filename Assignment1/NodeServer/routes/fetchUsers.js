//Require Read & Write Module
const fs = require("fs");

// Fetch Users
module.exports = function(app, path){
    app.post("/fetchUsers", function(req, res){
        
        let users = {};
        
        let username = req.body.username;

        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            users = allData.users;
            
            //Exclude Current User
            for(let i = 0; i < users.length; i++){
                if(users[i].username == username){
                    users.splice([i], 1);
                }
            }
            res.send(users);
        });
    });
}