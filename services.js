
var db = require('seriate');


var i = 0;


const sqlConfig = {
	user: process.env.user,
	password: process.env.password,
	server: process.env.server,
	database: process.env.database
  }
  
  const connection_checkmarx = new sql.ConnectionPool(sqlConfig)

// SQL Server and database config

var config = {
	// Dev database
 	"Driver": "SQL Server Native Client 11.0",
	"server": process.env.server,
	"user": process.env.user,
	"port": process.env.port,
	"password": process.env.password,
	"database": process.env.database, 

	options: {
		encrypt: true // Use this if you're on Windows Azure
	}
};
db.addConnection(config);
db.stream = true;

// Get Logged in user Role
exports.getUserDetails = function(req,res)
{
	connection_checkmarx.connect() //get a connection from the pool
	.then(function() {
	  const request = new sql.Request(connection_checkmarx); //create a request
		request.input('email_id',  validator.escape(req.params.email_id));// name, type, value
		request.query(`EXECUTE SP_get_userrole @email_id`)//the name of the procedure
		  .then(result => {
			console.log("result,",result);
			connection_checkmarx.close();
			res.send({ results });
				  }).catch(err => {
			console.log("err,",err);
			connection_checkmarx.close();
		  res.send(err)
		  });
		})
}
