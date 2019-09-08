//Require Read & Write Module
const fs = require("fs");

// Create Group
module.exports = function(app, path){
    app.post("/createGroup", function(req, res){
        let newGroup = {
            "groupName" : req.body.groupName,
            "users" : []
        }

        let allData = [];
        let groups = [];
                
        let groupUnique = true;

        if(!req.body){
            return res.sendstatus(400);
        }

        //Read JSON
        fs.readFile("./data.json", "utf-8", function(err, data){
            
            //Handle Errors
            if(err) {
                throw err;
            }
            
            //Check Group is Unique
            allData = JSON.parse(data);
            for(let i = 0; i < allData.groups.length; i++){
                if(allData.groups[i].groupName == newGroup.groupName){
                    groupUnique = false;
                }
            }
            if(groupUnique){
                allData.groups.push(newGroup);
                groups = allData.groups;
                console.log(allData);

                let allDataJson = JSON.stringify(allData);
                
                //Write JSON
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    
                    //Handle Errors
                    if(err){
                        throw err;
                    }
                });
                res.send(groups);
            }
            else{
                res.send("Group exists");
            }
        });
    });
}