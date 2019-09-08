//Require Read & Write Module
const fs = require("fs");

// Delete Channel
module.exports = function(app, path){
    app.post("/deleteChannel", function(req, res){
        
        let allData = [];
        let channels = [];
        
        let channelName = req.body.channelName;

        //Read JSON
        fs.readFile("./data.json", "utf8", function(err, data){
            
            //Handle Error
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            channels = allData.channels;
            allData.channels = channels;
            
            //Exclude Current User
            for(let i = 0; i < channels.length; i++){
                if(channels[i].channelName == channelName){
                    console.log(channels[i]);
                    channels.splice([i], 1);
                }
            }
            
            //Write JSON
            allDataJson = JSON.stringify(allData);
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    
                    //Handle Error
                    if(err){
                        throw err;
                    }
                });
                res.send(channels);
        });
    });
}
