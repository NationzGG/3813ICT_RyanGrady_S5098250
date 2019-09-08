//Require Read & Write Module
const fs = require("fs");

// Delete User
module.exports = function(app, path){
    app.post("/deleteUser", function(req, res){
        
        let allData = [];
        let users = [];
        
        let username = req.body.username;

        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }
            
            allData = JSON.parse(data);
            users = allData.users;
            allData.users = users;
            
            //Exclude Current User
            for(let i = 0; i < users.length; i++){
                if(users[i].username == username){
                    users.splice([i], 1);
                }
            }

            //Write JSON
            let allDataJson = JSON.stringify(allData);
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    
                    //Handle Error
                    if(err){
                        throw err;
                    }
                });
                res.send(users);
        });
    });
}