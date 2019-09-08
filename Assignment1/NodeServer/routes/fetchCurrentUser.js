//Require Read & Write Module
const fs = require("fs");

// Fetch Current User
module.exports = function(app, path){
    app.post("/fetchCurrentUser", function(req, res){
        
        let user = {};
        
        let username = req.body.username;

        if(!req.body){
            return res.sendstatus(400);
        }

        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){

            //Handle Error
            if(err){
                throw err;
            }

            allData = JSON.parse(data);
            for(let i = 0; i < allData.users.length; i++){
                if(allData.users[i].username == username){
                    user = allData.users[i];
                }
            }
            res.send(user);
        });
    });
}