//Require Read & Write Module
const fs = require("fs");

// Fetch Channel
module.exports = function(app, path){
    app.post("/fetchChannels", function(req, res){
        
        let channels = {};
        
        let channelName = req.body.channelName;
        
        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }
            
            allData = JSON.parse(data);
            channels = allData.channels;
            
            //Exclude Current User
            for(let i = 0; i < channels.length; i++){
                if(channels[i].channelName == channelName){
                    channels.splice([i], 1);
                }
            }
            res.send(channels);
        });
    });
}