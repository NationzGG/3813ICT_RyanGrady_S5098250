const fs = require("fs");

// Delete Group
module.exports = function(app, path){
    app.post("/deleteGroup", function(req, res){
        
        let allData = [];
        let groups = [];
        
        let groupName = req.body.groupName;
        
        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }

            allData = JSON.parse(data);
            groups = allData.groups;
            allData.groups = groups;
            
            //Exclude Current Usrer
            for(let i = 0; i < groups.length; i++){
                if(groups[i].groupName == groupName){
                    groups.splice([i], 1);
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
                res.send(groups);
        });
    });
}