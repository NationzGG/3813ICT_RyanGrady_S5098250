//Require Read & Write Module
const fs = require("fs");

// Create Channel
module.exports = function(app, path){
    app.post("/createChannel", function(req, res){
        
        //Define a channel
        let newChannel = {
            "users" : [],
            "groupName" : req.body.groupName,
            "channelName": req.body.channelName  
        }
        
        let data = [];
        let channels = [];
        
        let channelNameUnique = true;
    
        if(!req.body){
            return res.sendstatus(400);
        }

        //Read JSON file
        fs.readFile("./data.json", "utf-8", function(err, data){
            
//          //Handle Errors
            if(err) {
                throw err;
            }
            
            //Check for channelName in existing database
            data = JSON.parse(data);
            for(let i = 0; i < allData.channels.length; i++){
                if(data.channels[i].channelName == newChannel.channelName){
                    channelNameUnique = false;
                }
            }
            
            //If the name is unique add it to the database
            if(channelNameUnique){
                data.channels.push(newChannel);
                channels = data.channels;
                console.log(data);

                //Convert to data to JSON file
                let dataJson = JSON.stringify(data);
                
                //Write to JSON file
                fs.writeFile("./data.json", dataJson, "utf-8", function(err){
                    
                    //Handle Errors
                    if(err){
                        throw err;
                    }
                });
                res.send(channels);
            }
            
            //If the name is not unique, inform the user
            else{
                res.send("Error: Channel name is already in use");
            }
        });
    });
}