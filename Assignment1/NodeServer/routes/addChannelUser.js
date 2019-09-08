//Require Read & Write Module
const fs = require("fs");

// Add User
module.exports = function (app, path) {
    app.post("/addChannelUser", function (req, res) {

        let allData = [];
        let channels = [];
        
        let username = req.body.username;
        let channelName = req.body.channelName;

        if (!req.body) {
            return res.sendstatus(400);
        }

        //Read JSON
        fs.readFile("./data.json", "utf-8", function (err, data) {
            
            //Handle Errors
            if (err) {
                throw err;
            }
            
            //Read JSON
            allData = JSON.parse(data);
            for (let i = 0; i < allData.channels.length; i++) {
                //Check that user isn't already in channel
                if (allData.channels[i].channelName == channel && allData.channels[i].users.indexOf(user) == -1) {
                    allData.channels[i].users.push(username);
                }
            }

            channels = allData.channels;
            
            //Write JSON
            let allDataJson = JSON.stringify(allData);
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