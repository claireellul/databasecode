var fs = require('fs');
var configtext = ""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");
// now convert the configruation file into the correct format -i.e. a name/value pair array
var configarray = configtext.split(",");
var config = {};
for (var i = 0; i < configarray.length; i++) {
    var split = configarray[i].split(':');
    config[split[0].trim()] = split[1].trim();
}

var pg = require('pg');
var pool = new pg.Pool(config)
console.log(config);



function printMsg() {
  console.log("This is a message from the demo package");
}



function simpleQuery(req,res) {
 	pool.connect(function(err,client,done) {
      	if(err){
          	console.log("not able to get connection "+ err);
           	res.status(400).send(err);
       	} 
       	client.query('SELECT name FROM united_kingdom_counties' ,function(err,result) {
          done(); 
          if(err){
               console.log(err);
               res.status(400).send(err);
          }
          res.status(200).send(result.rows);
       });
    });

}




// the module.exports line gives a list of any of the functions in the module that can be called 
// from outside the module
module.exports = {
    printMsg: printMsg,
    simpleQuery: simpleQuery

}; 