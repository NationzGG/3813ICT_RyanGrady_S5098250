//Require Read & Write Module
const fs = require("fs");

// Fetch Groups
module.exports = function(app, path){
    app.post("/fetchGroups", function(req, res){
        
        let groups = {};
        
        let groupName = req.body.groupName;

        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }
            
            allData = JSON.parse(data);
            groups = allData.groups;
            
            //Exclude Current User
            for(let i = 0; i < groups.length; i++){
                if(groups[i].groupName == groupName){
                    groups.splice([i], 1);
                }
            }
            res.send(groups);
        });
    });
}