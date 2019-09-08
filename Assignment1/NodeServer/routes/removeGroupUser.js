//Require Read & Write Module
const fs = require("fs");

// Delete user from group by groupname and username
module.exports = function (app, path) {
    app.post("/removeGroupUser", function (req, res) {

        let allData = [];
        let groups = [];

        let user = req.body.username;
        let group = req.body.groupName;

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
                if (allData.groups[i].groupName == group) {
                    for(let j = 0; j < allData.groups[i].users.length; j++){
                        if(allData.groups[i].users[j] == user){
                            allData.groups[i].users.splice(j, 1);
                        }
                    }
                }
            }

            groups = allData.groups;

            //Write JSON
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