//Require Read & Write Module
const fs = require("fs");

// Delete user from channel by channelname and username
module.exports = function (app, path) {
    app.post("/removeChannelUser", function (req, res) {

        let allData = [];
        let channels = [];
        
        let user = req.body.username;
        let channel = req.body.channelName;


        if (!req.body) {
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function (err, data) {
            
            //Handle Error
            if (err) {
                throw err;
            }
            
            allData = JSON.parse(data);
            for (let i = 0; i < allData.channels.length; i++) {
                if (allData.channels[i].channelName == channel) {
                    for(let j = 0; j < allData.channels[i].users.length; j++){
                        if(allData.channels[i].users[j] == user){
                            allData.channels[i].users.splice(j, 1);
                        }
                    }
                }
            }

            channels = allData.channels;

            let allDataJson = JSON.stringify(allData);
            
            //Write JSON
            fs.writeFile("./data.json", allDataJson, "utf-8", function (err) {
                
                //Handle Error
                if (err) {
                    throw err;
                }
            });
            res.send(channels);
        });
});
}