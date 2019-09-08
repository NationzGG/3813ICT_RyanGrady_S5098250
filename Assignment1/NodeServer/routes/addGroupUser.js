//Require Read & Write Module
const fs = require("fs");

// Add User
module.exports = function (app, path) {
    app.post("/addGroupUser", function (req, res) {

        let allData = [];
        let groups = [];
        
        let currentUsername = req.body.username;
        let currentGroupName = req.body.groupName;

        if (!req.body) {
            return res.sendstatus(400);
        }

        //Read JSON
        fs.readFile("./data.json", "utf-8", function (err, data) {
            
            //Handle Error
            if (err) {
                throw err;
            }
            
            allData = JSON.parse(data);
            for (let i = 0; i < allData.groups.length; i++) {
                if (allData.groups[i].groupName == currentGroupName && allData.groups[i].users.indexOf(currentUsername) == -1) {
                    allData.groups[i].users.push(currentUsername);
                }
            }

            groups = allData.groups;
            
            let allDataJson = JSON.stringify(allData);
            fs.writeFile("./data.json", allDataJson, "utf-8", function (err) {
                
                //Handle Error
                if (err) {
                    throw err;
                }
                
            });
            res.send(groups);
        });
});
}